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

    const date = moment(row['Date'], 'DD.MM.YYYY');

    return {
      Project: project || row["Project Name"],
      Department: department,
      Description: row["Note"],
      Task: row["Task Name"],
      User: user || row["User"],
      Email: email || row["Email"],
      Tags: row["Tags"],
      Billable: "Yes",
      StartDate: date.toISOString(),
      StartTime: row["Start Time"],
      EndDate: date.toISOString(),
      EndTime: row["End Time"],
      DurationHours: row["Duration"],
      DurationDecimal: row["Duration in Hours"],
      BillableRate: 0,
      BillableAmount: 0,
    }
  });
  const output = await convertToCsv(processed);
  await downloadCsv(res, output);
}
