import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { EvalRbf } from 'models';
import Papa from 'papaparse';
import { ChangeEvent, ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface EvalRbfFormProps {
  onSubmit: (values: EvalRbf, real_output: number) => void;
}

const Input = styled('input')({
  display: 'none',
});

const EvalRbfForm = (props: EvalRbfFormProps): ReactElement => {
  const { onSubmit } = props;
  const [realOutput, setRealOutput] = useState<number>(0);

  const EvalRbfSchema = Yup.object().shape({
    inputs: Yup.array().of(Yup.number()).required().min(1, 'Al menos uno'),
  });

  const form = useForm<EvalRbf>({
    defaultValues: {
      inputs: [],
    },
    mode: 'onChange',
    resolver: yupResolver(EvalRbfSchema),
  });

  const { handleSubmit, setValue } = form;

  const handleFormSubmit = (values: EvalRbf): void => {
    onSubmit(values, realOutput);
  };

  const handleLoadFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files![0];
    Papa.parse(file, {
      complete: results => {
        const { data } = results;
        const inputs = [];
        const outputs = [];

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < data.length - 1; ++i) {
          const row = data[i].map(val => parseFloat(val)) as number[];
          const output = row[row.length - 1];
          row.pop();

          inputs.push(row);
          outputs.push(output);
        }
        setValue('inputs', inputs[0]);
        setRealOutput(outputs[0]);
      },
    });
  };

  return (
    <FormProvider {...form}>
      <Stack spacing={3} sx={{ mt: 5 }}>
        <label htmlFor="contained-button-file">
          <Input
            accept="csv/*"
            id="contained-button-file"
            type="file"
            onChange={handleLoadFile}
          />
          <Button variant="contained" component="span" fullWidth>
            Cargar datos de simulación
          </Button>
        </label>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleFormSubmit)}
          sx={{ mt: 3 }}
        >
          Simular
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default EvalRbfForm;
