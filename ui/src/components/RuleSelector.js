import { useState } from 'react';
import { Checkbox, Stack, FormControl, FormLabel, Input, Button, Container } from '@mui/joy';

const RuleSelector = ({ onSelection }) => {
  const [ruleNumber, setRuleNumber] = useState(30);
  const [size, setSize] = useState(1000);
  const [numGenerations, setNumGenerations] = useState(2000);
  const [randomInitialState, setRandomInitialState] = useState(false);

  const onChangeRuleNumber = (event) => { setRuleNumber(event.target.value) }
  const onChangeSize = (event) => { setSize(event.target.value) }
  const onChangeNumGenerations = (event) => { setNumGenerations(event.target.value) }
  const onChangeRandomInitialState = (event) => { setRandomInitialState(event.target.checked) }

  const handleSubmit = () => {
    onSelection(ruleNumber, size, numGenerations, randomInitialState);
  };

  const inputStyle = { padding: '10px 14px' }

  return (
    <Container style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={1}>
          <FormControl>
            <FormLabel>Rule number</FormLabel>
            <Input value={ruleNumber} onChange={onChangeRuleNumber} placeholder="Rule number"  style={inputStyle} required />
          </FormControl>
          <FormControl>
            <FormLabel>Size</FormLabel>
            <Input value={size} onChange={onChangeSize} placeholder="Size" style={inputStyle} required />
          </FormControl>
          <FormControl>
            <FormLabel>Number of generations</FormLabel>
            <Input value={numGenerations} onChange={onChangeNumGenerations} placeholder="Number of generations" style={inputStyle} required />
          </FormControl>
          <Checkbox label="Random initial state" style={{ marginTop: '20px' }} checked={randomInitialState} onChange={onChangeRandomInitialState}/>
          <Button type="submit" style={{ padding: '10px 14px', marginTop: '20px' }}>Submit</Button>
        </Stack>
      </form>
    </Container>
  );
}

export default RuleSelector;