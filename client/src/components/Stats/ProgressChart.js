import React, { useContext } from 'react';
import {Doughnut} from 'react-chartjs-2'
import { ComplainContext } from '../../Contexts/Complains/complainsContext';


const ProgressChart = ({status}) => {
  console.log(status);
  const { complains, dispatchComplains } = useContext(ComplainContext)
  	const data = {
		labels: status.x,
		datasets: [
			{
				label: 'Progress',
				data: status.y,

				backgroundColor: ['#bf616a', '#ebcb8b', '#81a1c1', '#a3be8c'],
			},
		],
	}
  const options = {
		title: {
			display: true,
			text: 'Progress',
			fontColor: 'white',
		},
		responsive: true,
		maintainAspectRatio: true,
	}

  return <Doughnut data={data} options={options}/>
};

export default ProgressChart;