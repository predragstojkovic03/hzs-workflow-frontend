import { Tooltip } from 'react-tooltip';
import Button from '../Button/Button';
import exportFromJSON from 'export-from-json';
import { FaFileExcel } from 'react-icons/fa';

interface ExcelExportProps {
  data: {
    teamName: string;
    captainName: string;
    captainEmail: string;
    moodlePassword?: string;
  }[];
  fileName: string;
}

const ExcelExport = ({ data, fileName }: ExcelExportProps) => {
  return (
    <span style={{ width: 'fit-content' }}>
      <Tooltip id='excel-export-tooltip' />
      <span
        data-tooltip-id='excel-export-tooltip'
        data-tooltip-content='Eksportuj excel'
        style={{ width: 'fit-content' }}
      >
        <Button
          onClick={() => exportFromJSON({ data, fileName, exportType: 'xls' })}
        >
          <FaFileExcel />
        </Button>
      </span>
    </span>
  );
};

export default ExcelExport;
