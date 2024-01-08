// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { convertToCsv, downloadCsv, parseCsvFile, parseForm } from '../../util/parseForm';
import moment from 'moment';
import { Row } from '../../util/row';


export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  name: string
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (req.method !== "POST") {
    res.status(400).send(`Invalid method: ${req.method}`);
    return;
  }
  const { files, fields } = await parseForm(req);
  const { project, department, user, email } = fields;
  const data = await parseCsvFile(files, 'file');
  const processed = data.map((rowData: any) => {
    const row = new Row(rowData);

    const date = moment(row.get('Date'), 'DD/MM/YYYY');
    const duration = moment.duration({
      seconds: row.get('Duration in Seconds') ?? 0,
    });
    return {
      Project: project || row.get("Project Name"),
      Department: department || row.get("Company Name"),
      Description: row.get("Note"),
      Task: row.get("Task Name"),
      User: user || row.get("User"),
      Email: email || row.get("Email"),
      Tags: row.get("Tags"),
      Billable: "Yes",
      "Start Date": date.format('YYYY-MM-DD'),
      "Start Time": row.get("Start Time"),
      "End Date": date.format('YYYY-MM-DD'),
      "End Time": row.get("End Time"),
      "Duration (h)": `${duration.hours() || '00'}:${duration.minutes() || '00'}:${duration.seconds() || '00'}`,
      "Duration (decimal)": row.get("Duration in Hours"),
    }
  });
  const output = await convertToCsv(processed);
  await downloadCsv(res, output);
}
