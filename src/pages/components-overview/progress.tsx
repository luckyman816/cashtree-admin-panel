import { useEffect, useRef, useState } from 'react';

// material-ui
import { CircularProgress, Grid, LinearProgress, Stack, useTheme } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentHeader from 'components/cards/ComponentHeader';
import CircularWithLabel from 'components/@extended/progress/CircularWithLabel';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import LinearWithIcon from 'components/@extended/progress/LinearWithIcon';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

import ComponentWrapper from 'sections/components-overview/ComponentWrapper';
import ComponentSkeleton from 'sections/components-overview/ComponentSkeleton';

// assets
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

// ==============================|| COMPONENTS - PROGRESS ||============================== //

const ComponentProgress = () => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (bufferProgress > 100) {
        setBufferProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setBufferProgress(bufferProgress + diff);
        setBuffer(bufferProgress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const bufferTimer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(bufferTimer);
    };
  }, []);

  const ciProgressCodeString = `<CircularProgress sx={{ color: 'red' }} />
<CircularProgress color="secondary" />
<CircularProgress color="success" />
<CircularProgress color="warning" />
<CircularProgress color="info" />
<CircularProgress color="error" />`;

  const ciProgressWithPathCodeString = `<CircularWithPath />
<CircularWithPath color="secondary" />
<CircularWithPath color="success" />
<CircularWithPath color="warning" />
<CircularWithPath color="info" />
<CircularWithPath color="error" />`;

  const cdProgressCodeString = `<CircularProgress variant="determinate" value={25} />
<CircularProgress variant="determinate" value={50} />
<CircularProgress variant="determinate" value={75} />
<CircularProgress variant="determinate" value={100} />
<CircularProgress variant="determinate" value={progress} />`;

  const cdProgressWithPathCodeString = `<CircularWithPath variant="determinate" value={25} />
<CircularWithPath variant="determinate" value={50} />
<CircularWithPath variant="determinate" value={75} />
<CircularWithPath variant="determinate" value={100} />
<CircularWithPath variant="determinate" value={progress} />`;

  const clProgressCodeString = `<CircularWithLabel value={progress} />
<CircularWithLabel value={80} color="success" />
<CircularWithLabel value={55} color="info" />
<CircularWithLabel value={35} color="warning" />
<CircularWithLabel value={10} color="error" />`;

  const clWithPathCodeString = `<CircularWithPath showLabel value={progress} />
<CircularWithPath showLabel value={80} variant='determinate' color="success" />
<CircularWithPath showLabel value={55} variant='determinate' color="info" />
<CircularWithPath showLabel value={35} variant='determinate' color="warning" />
<CircularWithPath showLabel value={10} variant='determinate' color="error" />`;

  const clProgressSize = `<CircularProgress size={20} />
<CircularWithPath size={32} color="success" />
<CircularProgress variant="determinate" value={80} color="info" />
<CircularWithPath size={52} variant="determinate" value={40} color="warning" />
<CircularWithLabel size={64} variant="determinate" value={75} color="error" />
<CircularWithPath size={80} showLabel variant="determinate" value={55} color="secondary" />`;

  const lbProgressCodeString = `<LinearProgress variant="buffer" value={bufferProgress} valueBuffer={buffer} />`;

  const liProgressCodeString = `<LinearProgress />`;

  const ldProgressCodeString = `<LinearProgress variant="determinate" value={progress} />`;

  const llProgressCodeString = `<LinearWithIcon value={100} color="success" icon={<CheckCircleFilled style={{ color: theme.palette.success.main }} />} />
<LinearWithLabel variant="determinate" value={progress} />
<LinearWithIcon value={5} color="error" icon={<CloseCircleFilled style={{ color: theme.palette.error.main }} />} />`;

  const lchProgressCodeString = `<LinearWithLabel value={80} />
<LinearWithLabel value={75} color="secondary" sx={{ height: 6 }} />
<LinearWithLabel value={99} color="success" sx={{ height: 8 }} />
<LinearWithLabel value={35} color="warning" sx={{ height: 10 }} />
<LinearWithLabel value={60} color="info" sx={{ height: 12 }} />
<LinearWithLabel value={15} color="error" sx={{ height: 2 }} />`;

  return (
    <ComponentSkeleton>
      <ComponentHeader
        title="Progress"
        caption="Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process."
        directory="src/pages/components-overview/progress"
        link="https://mui.com/material-ui/react-progress/"
      />
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Stack spacing={3}>
              <MainCard title="Circular Indeterminate" codeHighlight codeString={ciProgressCodeString}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <CircularProgress sx={{ color: 'red' }} />
                  </Grid>
                  <Grid item>
                    <CircularProgress color="secondary" />
                  </Grid>
                  <Grid item>
                    <CircularProgress color="success" />
                  </Grid>
                  <Grid item>
                    <CircularProgress color="warning" />
                  </Grid>
                  <Grid item>
                    <CircularProgress color="info" />
                  </Grid>
                  <Grid item>
                    <CircularProgress color="error" />
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Circular Indeterminate with path" codeString={ciProgressWithPathCodeString}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <CircularWithPath />
                  </Grid>
                  <Grid item>
                    <CircularWithPath color="secondary" />
                  </Grid>
                  <Grid item>
                    <CircularWithPath color="success" />
                  </Grid>
                  <Grid item>
                    <CircularWithPath color="warning" />
                  </Grid>
                  <Grid item>
                    <CircularWithPath color="info" />
                  </Grid>
                  <Grid item>
                    <CircularWithPath color="error" />
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Circular Determinate" codeString={cdProgressCodeString}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <CircularProgress variant="determinate" value={25} />
                  </Grid>
                  <Grid item>
                    <CircularProgress variant="determinate" value={50} />
                  </Grid>
                  <Grid item>
                    <CircularProgress variant="determinate" value={75} />
                  </Grid>
                  <Grid item>
                    <CircularProgress variant="determinate" value={100} />
                  </Grid>
                  <Grid item>
                    <CircularProgress variant="determinate" value={progress} />
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Circular Determinate With Path" codeString={cdProgressWithPathCodeString}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <CircularWithPath variant="determinate" value={25} />
                  </Grid>
                  <Grid item>
                    <CircularWithPath variant="determinate" value={50} />
                  </Grid>
                  <Grid item>
                    <CircularWithPath variant="determinate" value={75} />
                  </Grid>
                  <Grid item>
                    <CircularWithPath variant="determinate" value={100} />
                  </Grid>
                  <Grid item>
                    <CircularWithPath variant="determinate" value={progress} />
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Circular With Label" codeString={clProgressCodeString}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <CircularWithLabel value={progress} />
                  </Grid>
                  <Grid item>
                    <CircularWithLabel value={80} color="success" />
                  </Grid>
                  <Grid item>
                    <CircularWithLabel value={55} color="info" />
                  </Grid>
                  <Grid item>
                    <CircularWithLabel value={35} color="warning" />
                  </Grid>
                  <Grid item>
                    <CircularWithLabel value={10} color="error" />
                  </Grid>
                </Grid>
              </MainCard>
              <MainCard title="Circular With Label and Path" codeString={clWithPathCodeString}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <CircularWithPath showLabel variant="determinate" value={progress} />
                  </Grid>
                  <Grid item>
                    <CircularWithPath showLabel variant="determinate" value={80} color="success" />
                  </Grid>
                  <Grid item>
                    <CircularWithPath showLabel variant="determinate" value={55} color="info" />
                  </Grid>
                  <Grid item>
                    <CircularWithPath showLabel variant="determinate" value={35} color="warning" />
                  </Grid>
                  <Grid item>
                    <CircularWithPath showLabel variant="determinate" value={10} color="error" />
                  </Grid>
                </Grid>
              </MainCard>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={3}>
              <MainCard title="Linear Indeterminate" codeString={liProgressCodeString}>
                <LinearProgress />
              </MainCard>
              <MainCard title="Linear Determinate" codeString={ldProgressCodeString}>
                <LinearProgress variant="determinate" value={progress} />
              </MainCard>

              <MainCard title="Linear With Label / Icon" codeString={llProgressCodeString}>
                <Stack spacing={1}>
                  <LinearWithIcon value={100} color="success" icon={<CheckCircleFilled style={{ color: theme.palette.success.main }} />} />
                  <LinearWithLabel variant="determinate" value={progress} />
                  <LinearWithIcon value={5} color="error" icon={<CloseCircleFilled style={{ color: theme.palette.error.main }} />} />
                </Stack>
              </MainCard>
              <MainCard title="Linear Color With Height" codeString={lchProgressCodeString}>
                <Stack spacing={1}>
                  <LinearWithLabel value={80} />
                  <LinearWithLabel value={75} color="secondary" sx={{ height: 6 }} />
                  <LinearWithLabel value={99} color="success" sx={{ height: 8 }} />
                  <LinearWithLabel value={35} color="warning" sx={{ height: 10 }} />
                  <LinearWithLabel value={60} color="info" sx={{ height: 12 }} />
                  <LinearWithLabel value={15} color="error" sx={{ height: 2 }} />
                </Stack>
              </MainCard>
              <MainCard title="Linear Buffer" codeString={lbProgressCodeString}>
                <LinearProgress variant="buffer" value={bufferProgress} valueBuffer={buffer} />
              </MainCard>
              <MainCard title="Circular Progress Size" codeString={clProgressSize}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <CircularProgress size={20} />
                  </Grid>
                  <Grid item>
                    <CircularWithPath color="success" size={32} />
                  </Grid>
                  <Grid item>
                    <CircularProgress variant="determinate" value={80} color="info" />
                  </Grid>
                  <Grid item>
                    <CircularWithPath variant="determinate" value={40} color="warning" size={52} />
                  </Grid>
                  <Grid item>
                    <CircularWithLabel variant="determinate" value={75} color="error" size={64} />
                  </Grid>
                  <Grid item>
                    <CircularWithPath showLabel variant="determinate" value={55} color="secondary" size={80} />
                  </Grid>
                </Grid>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </ComponentWrapper>
    </ComponentSkeleton>
  );
};

export default ComponentProgress;
