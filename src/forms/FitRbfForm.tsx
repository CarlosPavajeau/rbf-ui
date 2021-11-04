import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { FitRbf } from 'models';
import Papa from 'papaparse';
import { ChangeEvent, ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface TrainRbfFormProps {
  onSubmit: (values: FitRbf) => void;
}

const Input = styled('input')({
  display: 'none',
});

const FitRbfForm = (props: TrainRbfFormProps): ReactElement => {
  const { onSubmit } = props;

  const FitRbfSchema = Yup.object().shape({
    inputs: Yup.array()
      .of(Yup.array().of(Yup.number()))
      .required()
      .min(1, 'Al menos uno'),
    outputs: Yup.array().of(Yup.number()).required().min(1, 'Al menos uno'),
    tolerance: Yup.number().required(),
    epochs: Yup.number().required().min(1, 'El valor debe ser mayor a 0'),
  });

  const form = useForm<FitRbf>({
    defaultValues: {
      inputs: [],
      outputs: [],
      tolerance: 0.001,
      epochs: 1,
    },
    mode: 'onChange',
    resolver: yupResolver(FitRbfSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const handleFormSubmit = (values: FitRbf): void => {
    onSubmit(values);
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

        setValue('inputs', inputs);
        setValue('outputs', outputs);
      },
    });
  };

  return (
    <FormProvider {...form}>
      <Stack spacing={2} sx={{ mt: 5 }}>
        <TextField
          label="Tolerancia"
          type="number"
          {...register('tolerance')}
          error={!!errors.tolerance}
          helperText={errors.tolerance?.message}
        />

        <TextField
          label="Iteraciones"
          type="number"
          {...register('epochs')}
          error={!!errors.epochs}
          helperText={errors.epochs?.message}
        />

        <label htmlFor="contained-button-file">
          <Input
            accept="csv/*"
            id="contained-button-file"
            type="file"
            onChange={handleLoadFile}
          />
          <Button variant="contained" component="span" fullWidth>
            Cargar datos de entrenamiento
          </Button>
        </label>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleFormSubmit)}
          sx={{ mt: 3 }}
        >
          Entrenar
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default FitRbfForm;
