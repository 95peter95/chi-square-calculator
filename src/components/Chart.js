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
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="black" />
        <Line type="monotone" dataKey="pv" stroke="red" />
        <Line type="monotone" dataKey="uv2" stroke="black" />
        <Line type="monotone" dataKey="pv2" stroke="red" />

        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis dataKey="pv" />
        <XAxis dataKey="name2" />
        <YAxis dataKey="pv2" />
        <Tooltip />
      </LineChart>
    );
  }
}
