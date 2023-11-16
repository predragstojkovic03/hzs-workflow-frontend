import { Tooltip } from 'react-tooltip';
import Button from '../Button/Button';
import exportFromJSON from 'export-from-json';
import { FaFileExcel } from 'react-icons/fa';

interface ExcelExportProps {
  data: {
    ['Ime tima']: string;
    ['Ime kapitena']: string;
    ['Mejl kapitena']: string;
    ['Broj telefona kapitena']: string;
    ['Moodle lozinlka']?: string;
  }[];
  fileName: string;
  type: 'passed' | 'notPassed';
}

const ExcelExport = ({ data, fileName, type }: ExcelExportProps) => {
  return (
    <span style={{ width: 'fit-content' }}>
      <Tooltip id='excel-export-tooltip' />
      <span
        data-tooltip-id='excel-export-tooltip'
        data-tooltip-content={type === 'passed' ? 'Prosli' : 'Nisu prosli'}
        style={{ width: 'fit-content', fontSize: '20px' }}
      >
        <Button
          onClick={() => exportFromJSON({ data, fileName, exportType: 'xls' })}
          styleType={type == 'notPassed' ? 'purple' : 'primary'}
        >
          <FaFileExcel />
        </Button>
      </span>
    </span>
  );
};

export default ExcelExport;
