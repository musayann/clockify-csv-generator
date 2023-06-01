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

    const duration = moment.duration(row["Duration"]);

    const startDate = moment(row["Start date"]);
    const endDate = moment(row["End date"]);

    return {
      Project: project || row["Project"],
      Department: department || row["Client"],
      Description: row["Description"],
      Task: row["Task"],
      User: user || row["User"],
      Email: email || row["Email"],
      Tags: row["Tags"],
      Billable: "Yes",
      StartDate: startDate.format('YYYY-MM-DD'),
      StartTime: row["Start time"],
      EndDate: endDate.format('YYYY-MM-DD'),
      EndTime: row["End time"],
      DurationHours: row["Duration"],
      DurationDecimal: duration.asHours().toFixed(2),
      BillableRate: 0,
      BillableAmount: 0,
    }
  });
  const output = await convertToCsv(processed);
  await downloadCsv(res, output);
}
