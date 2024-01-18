import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BundleEntry, QuestionnaireResponse } from 'fhir/r4'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import { transferGCSDataToFirestore } from './PHQHelpers';
import {extractPHQ9JSON} from './PHQHelpers'
import phq9questions from '../../data/phq9questions.json';
import { Card, Typography, Stack, withStyles } from '@mui/material';

interface PHQ9ResultsTableProps {

  responses: BundleEntry<QuestionnaireResponse>[];
}

const PHQ9ResultsTable: React.FC<PHQ9ResultsTableProps> = ({ responses }) => {
  console.log("responses",responses);
  const {questionOptions, answerOptions} = extractPHQ9JSON(phq9questions);

  // console.log("questions", extractPHQ9JSON(phq9questions));
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
    <Stack>
     
      
   <Table >
  <TableHead>
    <TableRow>
      <TableCell onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Date {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </TableCell>
      {questionOptions.map((option, index) => (
        <TableCell key={index}>{option.linkId}</TableCell>
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
    
      <Stack direction="row">
      <Stack spacing={2} padding={2} width="70%">
      <Typography>Question Key</Typography>
        <Card sx={{ padding: 2 }}>
        {questionOptions.map((question) => (
        <Typography variant="subtitle2" key={question.linkId}>
          {question.linkId}: {question.text}
        </Typography>
      ))}
        </Card>
      </Stack>

      <Stack spacing={2} padding={2} width="30%">
          <Typography>Answer Key</Typography>
        <Card sx={{ padding: 2 }}>
        {answerOptions.map((answer) => (
        <Typography variant="subtitle2" key={answer.valueDecimal}>
          {answer.valueDecimal}: {answer.display}
        </Typography>
      ))}
        </Card>
      </Stack>
      </Stack>


    </Stack>
  );
};

export default PHQ9ResultsTable;