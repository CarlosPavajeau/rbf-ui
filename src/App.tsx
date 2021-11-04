import {
  Box,
  Container,
  Divider,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';

import ErrorsChart from './ErrorsChart';
import EvalRbfForm from './forms/EvalRbfForm';
import FitRbfForm from './forms/FitRbfForm';
import InitRbfForm from './forms/InitRbfForm';
import { FitRbf, InitRbf, RbfResponse } from './models';
import RbfService from './RbfService';

const steps = ['Configurar', 'Entrenar', 'Simular'];

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [rbf, setRbf] = useState<RbfResponse | null>(null);
  const [errors, setErrors] = useState([]);
  const [simulate, setSimulate] = useState(true);
  const [simulation, setSimulation] = useState({
    inputs: [],
    red_output: 0,
    real_output: 0,
  });

  const handleInitRbf = async (values: InitRbf) => {
    const response = await RbfService.init(values);
    setRbf(response);
    setActiveStep(1);
  };

  const handleFitRbf = async (values: FitRbf) => {
    const response = await RbfService.fit(values);
    setRbf(response);
    setErrors(response.errors);
    setSimulate(false);
    alert('SIUUUUUUUUU!');
  };

  const handleEvalRbf = async (values: FitRbf, real_output: number) => {
    const response = await RbfService.eval(values);
    setSimulation({
      inputs: values.inputs,
      red_output: response,
      real_output,
    });
  };

  return (
    <Container maxWidth="xl" sx={{ p: 5 }}>
      <header>
        <Typography variant="h3" align="center">
          Funciones de base radial
        </Typography>
      </header>

      <Box sx={{ width: '100%', mt: 7 }}>
        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 5 }}>
          {activeStep === 0 && (
            <Stack spacing={3}>
              <Box
                sx={{
                  bgcolor: 'rgb(244, 246, 248)',
                  p: 3,
                  borderRadius: '8px',
                }}
              >
                <Typography variant="h4">Configuración de la red</Typography>
                <Typography variant="body2" color="textSecondary">
                  Configura los parámetros de la función de base radial.
                </Typography>

                <InitRbfForm onSubmit={handleInitRbf} />
              </Box>
            </Stack>
          )}
          {activeStep === 1 && (
            <Stack spacing={3}>
              <Box
                sx={{
                  bgcolor: 'rgb(244, 246, 248)',
                  p: 3,
                  borderRadius: '8px',
                }}
              >
                <Typography variant="h5">Entrenar</Typography>
                <Typography variant="body1">
                  Entrena la función de base radial
                </Typography>

                <Stack
                  direction="row"
                  spacing={3}
                  divider={<Divider orientation="vertical" />}
                >
                  <Stack spacing={3} sx={{ width: 500 }}>
                    <Typography variant="h6">
                      Información de la red, número de entradas:{' '}
                      {rbf?.num_inputs}
                    </Typography>
                    <FitRbfForm onSubmit={handleFitRbf} />
                  </Stack>
                  <Box sx={{ width: '100%' }}>
                    <ErrorsChart errors={errors} />
                  </Box>
                </Stack>
              </Box>

              <Button
                variant="outlined"
                disabled={simulate}
                onClick={() => setActiveStep(2)}
              >
                Simular
              </Button>
            </Stack>
          )}
          {activeStep === 2 && (
            <Stack spacing={3}>
              <Box
                sx={{
                  bgcolor: 'rgb(244, 246, 248)',
                  p: 3,
                  borderRadius: '8px',
                }}
              >
                <Typography variant="h5">Simular</Typography>
                <Typography variant="body1">
                  Simula la función de base radial
                </Typography>

                <EvalRbfForm onSubmit={handleEvalRbf} />
              </Box>

              <Box
                sx={{
                  bgcolor: 'rgb(244, 246, 248)',
                  p: 3,
                  borderRadius: '8px',
                }}
              >
                <Typography variant="h6">Resultado de simulación</Typography>
                <Typography>
                  Entradas: {simulation.inputs.join(', ')}
                </Typography>
                <Typography>
                  Salida de la red: {simulation.red_output}
                </Typography>
                <Typography>Salida real: {simulation.real_output}</Typography>
              </Box>
            </Stack>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default App;
