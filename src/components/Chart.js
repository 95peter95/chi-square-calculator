import { h, Component } from "preact";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default class componentName extends Component {
  render() {
    const { data } = this.props;

    return (
      <LineChart
        width={350}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="black" />
        <Line type="monotone" dataKey="pv" stroke="red" />
        
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    );
  }
}
