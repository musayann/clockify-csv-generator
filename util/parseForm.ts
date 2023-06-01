
import formidable from 'formidable';
import { IncomingMessage } from "http";
import csv from 'csvtojson';
import { json2csv } from 'json-2-csv';
import stream, { Readable } from 'stream';
import { promisify } from 'util';
const pipeline = promisify(stream.pipeline);

export const parseForm = async (
    req: IncomingMessage
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const form = formidable();
    return await new Promise(async (resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
};

export const parseCsvFile = async (files: formidable.Files, filename = 'file') => {
    const file = files[filename] as formidable.File;
    return csv()
        .fromFile(file.filepath);
}
export const cleanData = (data: any) => {
    return data.map((row: any) => {
        const rowData: any = {};
        Object.keys(row).forEach((key: string) => {
            rowData[key.trim()] = row[key] ?? "";
        });
        return rowData;
    });
};

export const convertToCsv = async (data: any) => {
    return json2csv(cleanData(data))
}

export const downloadCsv = async (res: any, data: any, filename = 'output.csv') => {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="output.csv"`);

    res.status(200);

    await pipeline(Readable.from(new Buffer(data)), res);
}