import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getQuestionLabel, getOptionLabel } from '../lib/formUtils';

export const exportToExcel = (data: Record<string, any>[]) => {
    const formattedData = data.map(item => {
        const { clientName, clientId, status, applicant, updated_at, ...responses } = item;

        // Map numeric keys to readable labels
        const readableResponses: Record<string, any> = {};
        Object.entries(responses)
            .filter(([key]) => /^\d+$/.test(key)) // Only numeric question keys
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .forEach(([key, value]) => {
                const qLabel = getQuestionLabel(key);
                const readableValue = getOptionLabel(key, value) || '-';
                readableResponses[qLabel] = readableValue;
            });

        return {
            'Applicant': applicant,
            'Client Name': clientName,
            'Client ID': clientId,
            Status: status,
            'Last Updated': new Date(updated_at).toLocaleString(),
            ...readableResponses,
        };
    });

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses');

    // Write the workbook and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    const fileName = `Form-Questions_${formattedData[0]['Client ID']}_${formattedData[0]['Client Name']}.xlsx`;

    saveAs(blob, fileName);
};
