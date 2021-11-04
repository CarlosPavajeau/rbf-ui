import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { InitRbf } from 'models';
import { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface InitRbfFormProps {
  onSubmit: (values: InitRbf) => void;
}

const InitRbfFormSchema = Yup.object().shape({
  num_inputs: Yup.number()
    .required('Este campo es requerido')
    .min(1, 'El valor debe ser mayor a 0')
    .typeError('El valor deber ser un número'),
  radial_centers: Yup.number()
    .required('Este campo es requerido')
    .min(1, 'El valor debe ser mayor a 0')
    .typeError('El valor deber ser un número'),
});

const InitRbfForm = (props: InitRbfFormProps): ReactElement => {
  const { onSubmit } = props;

  const form = useForm<InitRbf>({
    defaultValues: {
      num_inputs: 0,
      radial_centers: 0,
    },
    mode: 'onChange',
    resolver: yupResolver(InitRbfFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleFormSubmit = (values: InitRbf): void => {
    onSubmit(values);
  };

  return (
    <FormProvider {...form}>
      <Stack spacing={2} sx={{ mt: 5 }}>
        <TextField
          label="Número de entradas"
          type="number"
          variant="outlined"
          helperText={(errors.num_inputs && errors.num_inputs?.message) || ' '}
          error={!!errors.num_inputs}
          disabled={isSubmitting}
          {...register('num_inputs')}
          fullWidth
        />

        <TextField
          label="Centros radiales"
          type="number"
          variant="outlined"
          helperText={errors.radial_centers?.message || ' '}
          error={!!errors.radial_centers}
          disabled={isSubmitting}
          {...register('radial_centers')}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleFormSubmit)}
        >
          Inicializar red
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default InitRbfForm;
