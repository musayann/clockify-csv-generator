// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { convertToCsv, downloadCsv, parseCsvFile, parseForm } from '../../util/parseForm';
import moment from 'moment';


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
  const processed = data.map((row: any) => {

    const date = moment(row['Date']);
    const duration = moment.duration({
      seconds: row['Duration in Seconds'] ?? 0,
    });
    return {
      Project: project || row["Project Name"],
      Department: department,
      Description: row["Note"],
      Task: row["Task Name"],
      User: user || row["User"],
      Email: email || row["Email"],
      Tags: row["Tags"],
      Billable: "Yes",
      StartDate: date.format('YYYY-MM-DD'),
      StartTime: row["Start Time"],
      EndDate: date.format('YYYY-MM-DD'),
      EndTime: row["End Time"],
      DurationHours: `${duration.hours() || '00'}:${duration.minutes() || '00'}:${duration.seconds() || '00'}`,
      DurationDecimal: row["Duration in Hours"],
      BillableRate: 0,
      BillableAmount: 0,
    }
  });
  const output = await convertToCsv(processed);
  await downloadCsv(res, output);
}
