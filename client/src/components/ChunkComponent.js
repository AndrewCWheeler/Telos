import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(2)}px auto`,
    // padding: theme.spacing(2),
  },
}));

const ChunkComponent = props => {
  const {
    allTasks,
    setAllTasks,
    removeFromDom,
    onChangeHandler,
    onPatchHandler,
    onChunkHandler,
    data,
    setData,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {allTasks.map((task, i) =>
        task.chunked ? null : (
          <Paper key={i} elevation={3} className={classes.paper}>
            <Accordion

            // defaultExpanded
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1c-content'
                id='panel1c-header'
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    {task.name}
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    Chunk...{task.category}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <div className={classes.column} />
                {/* <div className={classes.column}>
            <Chip label='Barbados' onDelete={() => {}} />
          </div> */}
                <div className={clsx(classes.column, classes.helper)}>
                  <FormControl component='fieldset'>
                    <RadioGroup
                      row
                      // aria-label='category'
                      // value={task.category}
                    >
                      <FormControlLabel
                        value='Home'
                        control={<Radio color='primary' />}
                        label='Home'
                        labelPlacement='start'
                        name='category'
                        onChange={onChunkHandler}
                      />

                      <FormControlLabel
                        value='Health'
                        control={<Radio color='primary' />}
                        label='Health'
                        labelPlacement='start'
                        name='category'
                        onChange={onChangeHandler}
                      />
                      <FormControlLabel
                        value='Family'
                        control={<Radio color='primary' />}
                        label='Family'
                        labelPlacement='start'
                        name='category'
                        onChange={onChangeHandler}
                      />
                      <FormControlLabel
                        value='Finance'
                        control={<Radio color='primary' />}
                        label='Finance'
                        labelPlacement='start'
                        name='category'
                        onChange={onChangeHandler}
                      />
                      <FormControlLabel
                        value='Work'
                        control={<Radio color='primary' />}
                        label='Work'
                        labelPlacement='start'
                        name='category'
                        onChange={onChangeHandler}
                      />
                      <FormControlLabel
                        value='Creative'
                        control={<Radio color='primary' />}
                        label='Creative'
                        labelPlacement='start'
                        name='category'
                        onChange={onChangeHandler}
                      />
                      <FormControlLabel
                        value='Spiritual'
                        control={<Radio color='primary' />}
                        label='Spiritual'
                        labelPlacement='start'
                        name='category'
                        onChange={onChangeHandler}
                      />
                      <FormControlLabel
                        value='Social'
                        control={<Radio color='primary' />}
                        label='Social'
                        labelPlacement='start'
                        name='category'
                        onChange={onChangeHandler}
                      />
                    </RadioGroup>
                  </FormControl>
                  {/* <Typography variant='caption'>
                    Go to group
                    <br />
                    <a
                      href='#secondary-heading-and-columns'
                      className={classes.link}
                    >
                      Here
                    </a>
                  </Typography> */}
                </div>
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                <Button size='small'>Cancel</Button>
                <Button
                  size='small'
                  color='primary'
                  onClick={e => {
                    onPatchHandler(e, task._id);
                  }}
                >
                  Save
                </Button>
              </AccordionActions>
            </Accordion>
          </Paper>
        )
      )}
    </div>
  );
};

export default ChunkComponent;
