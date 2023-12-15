import { useState } from 'react';
// import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BundleEntry, QuestionnaireResponse } from 'fhir/r4'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


interface PHQ9ResultsTableProps {
  responses: BundleEntry<QuestionnaireResponse>[];
}

const PHQ9ResultsTable: React.FC<PHQ9ResultsTableProps> = ({ responses }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState('desc');
  const questionIds = ["PHQ9.1", "PHQ9.2", "PHQ9.3", "PHQ9.4", "PHQ9.5", "PHQ9.6", "PHQ9.7", "PHQ9.8", "PHQ9.9"];
  const questionNames = [
    "Interest or pleasure", 
    "Feeling down", 
    "Sleep issues", 
    "Low energy", 
    "Appetite issues", 
    "Self-esteem", 
    "Trouble concentrating", 
    "Movement or speech issues", 
    "Thoughts of self-harm"
  ];

  const getInterpretation = (score: number) => {
    if (score <= 4) {
      return "Minimal depression";
    } else if (score <= 9) {
      return "Mild depression";
    } else if (score <= 14) {
      return "Moderate depression";
    } else if (score <= 19) {
      return "Moderately severe depression";
    } else {
      return "Severe depression";
    }
  };  
  
  const sortedResponses = responses.sort((a, b) => {
    if (a.resource?.authored === undefined || b.resource?.authored === undefined) {
      return 0;
    }
    return sortOrder === 'asc'
      ? new Date(a.resource.authored).getTime() - new Date(b.resource.authored).getTime()
      : new Date(b.resource.authored).getTime() - new Date(a.resource.authored).getTime();
  });
  
  const paginatedResponses = sortedResponses.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const numberOfPages = Math.ceil(responses.length / itemsPerPage);

  return (
    <div>
   <Table>
  <TableHead>
    <TableRow>
      <TableCell onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Date {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </TableCell>
      {questionNames.map((name, index) => (
        <TableCell key={index}>{name}</TableCell>
      ))}
      <TableCell>Total</TableCell>
      <TableCell>Interpretation</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {paginatedResponses.map((response) => {
            const scores = questionIds.map((id) => {
              const item = response.resource?.item?.find((item) => item.linkId === id);
              const answer = item ? item.answer?.[0].valueInteger : 0;
              return answer;
            });
            const totalScore = scores.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);

            return (
              <TableRow key={response.resource?.id}>
                 <TableCell>{response.resource?.authored ? new Date(response.resource.authored).toLocaleDateString() : 'N/A'}</TableCell>
                {scores.map((score, index) => (
                  <td key={index}>{score}</td>
                ))}
                 <TableCell>{totalScore}</TableCell>
                 <TableCell>{totalScore !== undefined ? getInterpretation(totalScore) : 'N/A'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div style={{ textAlign: 'right' }}>
        Page &nbsp;
        {Array.from({ length: numberOfPages }, (_, i) => i).map((pageNumber) => (
          <Button 
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            variant={pageNumber === currentPage ? 'outline-dark' : 'outline-light'}
          >
            {pageNumber + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PHQ9ResultsTable;