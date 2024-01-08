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

    const duration = moment.duration(row.get("Duration"));

    const startDate = moment(row.get("Start date"));
    const endDate = moment(row.get("End date"));

    return {
      Project: project || row.get("Project"),
      Department: department || row.get("Client"),
      Description: row.get("Description"),
      Task: row.get("Task"),
      User: user || row.get("User"),
      Email: email || row.get("Email"),
      Tags: row.get("Tags"),
      Billable: "Yes",
      "Start Date": startDate.format('YYYY-MM-DD'),
      "Start Time": row.get("Start time"),
      "End Date": endDate.format('YYYY-MM-DD'),
      "End Time": row.get("End time"),
      "Duration (h)": row.get("Duration"),
      "Duration (decimal)": duration.asHours().toFixed(2),
    }
  });
  const output = await convertToCsv(processed);
  await downloadCsv(res, output);
}
