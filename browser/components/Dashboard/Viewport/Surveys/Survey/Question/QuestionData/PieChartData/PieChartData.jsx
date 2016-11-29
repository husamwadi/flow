import React, { PropTypes } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const responsesToData = (responses) => {
  // responses:
  // [ { value } ]
  const result = responses.reduce((agg, response) => {
    if (!agg[response.value]) {
      agg[response.value] = 1;
    } else {
      agg[response.value]++;
    }

    return agg;
  }, []);
  return Object.keys(result).map(key => ({ name: key, value: result[key] }));
};

const PieChartData = ({ responses }) => (
  <div>
    {responses.length === 0 ? 'No responses.' :
     (
       <PieChart width={800} height={400}>
        <Pie
          data={responsesToData(responses)}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
        >
         {responsesToData(responses).map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index}/>)}
        </Pie>
       </PieChart>
     )
    }
  </div>
);

PieChartData.propTypes = {
  responses: PropTypes.array.isRequired,
};

export default PieChartData;