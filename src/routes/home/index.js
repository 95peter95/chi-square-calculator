import { h, Component } from "preact";
import style from "./style";

const sumStrings = (str1, str2) =>
  Number.parseFloat(str1) + Number.parseFloat(str2);

const getExpected = (str1, str2, str3) => {
  const expected =
    (Number.parseFloat(str1) * Number.parseFloat(str2)) /
    Number.parseFloat(str3);

  return expected.toFixed(2);
};

const getResidual = (str1, str2) => {
  const residual =
    (Number.parseFloat(str1) - Number.parseFloat(str2)) ** 2 /
    Number.parseFloat(str2);
  return residual.toFixed(3);
};

const getChisquare = (str1, str2, str3, str4) => {
  const chisquare =
    Number.parseFloat(str1) +
    Number.parseFloat(str2) +
    Number.parseFloat(str3) +
    Number.parseFloat(str4);
  return chisquare.toFixed(3);
};

class Home extends Component {
  state = {
    observed: {
      row1: ["Observed", "", "", "Totals"],
      row2: ["", null, null, null],
      row3: ["", null, null, null],
      row4: ["Totals", null, null, null]
    },
    expected: {
      row1: ["Expected", "", "", "Totals"],
      row2: ["", null, null, null],
      row3: ["", null, null, null],
      row4: ["Totals", null, null, null]
    },
    residual: {
      row1: ["Residual", "", ""],
      row2: ["", null, null],
      row3: ["", null, null]
    },

    chisquare: {
      row1: ["ChiSquare", null]
    },

    step: 0
  };

  setValues = (e, columnIndex, index) => {
    let { observed } = this.state;
    let newRow = observed[`row${columnIndex}`];
    newRow[index] = e.target.value;

    observed[`row${columnIndex}`] = [...newRow];

    this.setState({
      observed
    });
  };

  onSumExpected = () => {
    let { observed: o, expected: e, residual: r, chisquare: chi } = this.state;

    // totals

    o.row2[3] = sumStrings(o.row2[1], o.row2[2]);
    o.row3[3] = sumStrings(o.row3[1], o.row3[2]);
    o.row4[3] = sumStrings(o.row4[1], o.row4[2]);

    o.row4[1] = sumStrings(o.row2[1], o.row3[1]);
    o.row4[2] = sumStrings(o.row2[2], o.row3[2]);
    o.row4[3] = sumStrings(o.row4[1], o.row4[2]);

    // expected
    e.row2[1] = getExpected(o.row4[1], o.row2[3], o.row4[3]);
    e.row2[2] = getExpected(o.row4[2], o.row2[3], o.row4[3]);

    e.row3[1] = getExpected(o.row4[1], o.row3[3], o.row4[3]);
    e.row3[2] = getExpected(o.row4[2], o.row3[3], o.row4[3]);

    // residual
    r.row2[1] = getResidual(o.row2[1], e.row2[1], e.row2[1]);
    r.row2[2] = getResidual(o.row2[2], e.row2[2], e.row2[2]);

    r.row3[1] = getResidual(o.row3[1], e.row3[1], e.row3[1]);
    r.row3[2] = getResidual(o.row3[2], e.row3[2], e.row3[2]);

    // chisquare
    chi.row1[1] = getChisquare(r.row2[1], r.row2[2], r.row3[1], r.row3[2]);

    this.setState({
      observed: o,
      expected: e,
      residual: r,
      chisquare: chi,
      step: 1
    });
  };

  render() {
    const {
      observed: o,
      expected: e,
      residual: r,
      chisquare: chi,
      step
    } = this.state;

    console.log(o);
    console.log(e);
    console.log(r);

    return (
      <div class={style.home}>
        <table>
          <tbody>
            <tr>
              <td>
                <input disabled value={o.row1[0]} />
              </td>
              <td>
                <input
                  type="text"
                  value={o.row1[1]}
                  onChange={e => this.setValues(e, 1, 1)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={o.row1[2]}
                  onChange={e => this.setValues(e, 1, 2)}
                />
              </td>
              <td>
                <input type="text" disabled value={o.row1[3]} />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  type="text"
                  value={o.row2[0]}
                  onChange={e => this.setValues(e, 2, 0)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={o.row2[1]}
                  onChange={e => this.setValues(e, 2, 1)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={o.row2[2]}
                  onChange={e => this.setValues(e, 2, 2)}
                />
              </td>
              <td>
                <input type="number" disabled value={o.row2[3]} />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  type="text"
                  value={o.row3[0]}
                  onChange={e => this.setValues(e, 3, 0)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={o.row3[1]}
                  onChange={e => this.setValues(e, 3, 1)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={o.row3[2]}
                  onChange={e => this.setValues(e, 3, 2)}
                />
              </td>
              <td>
                <input type="text" disabled value={o.row3[3]} />
              </td>
            </tr>

            <tr>
              <td>
                <input type="text" disabled value={o.row4[0]} />
              </td>
              <td>
                <input type="number" disabled value={o.row4[1]} />
              </td>
              <td>
                <input type="number" disabled value={o.row4[2]} />
              </td>
              <td>
                <input type="number" disabled value={o.row4[3]} />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <button onClick={this.onSumExpected}>Calculate Chi-Square Value</button>
        <br />
        <br />

        {/* EXPECTED */}

        {step == 1 && (
          <table>
            <tbody>
              <tr>
                <td>
                  <input disabled value={e.row1[0]} />
                </td>
                <td>
                  <input
                    type="text"
                    disabled
                    value={o.row1[1]}
                    onChange={e => this.setValues(e, 1, 1)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    disabled
                    value={o.row1[2]}
                    onChange={e => this.setValues(e, 1, 2)}
                  />
                </td>
                <td>
                  <input type="text" disabled value={o.row1[3]} />
                </td>
              </tr>

              <tr>
                <td>
                  <input
                    type="text"
                    disabled
                    value={o.row2[0]}
                    onChange={e => this.setValues(e, 2, 0)}
                  />
                </td>
                <td>
                  <input type="number" disabled value={e.row2[1]} />
                </td>
                <td>
                  <input
                    type="number"
                    disabled
                    value={e.row2[2]}
                    onChange={e => this.setValues(e, 2, 2)}
                  />
                </td>
                <td>
                  <input type="number" disabled value={o.row2[3]} />
                </td>
              </tr>

              <tr>
                <td>
                  <input
                    type="text"
                    disabled
                    value={o.row3[0]}
                    onChange={e => this.setValues(e, 3, 0)}
                  />
                </td>
                <td>
                  <input type="number" disabled value={e.row3[1]} />
                </td>
                <td>
                  <input type="number" disabled value={e.row3[2]} />
                </td>
                <td>
                  <input type="text" disabled value={o.row3[3]} />
                </td>
              </tr>

              <tr>
                <td>
                  <input type="text" disabled value={o.row4[0]} />
                </td>
                <td>
                  <input type="number" disabled value={o.row4[1]} />
                </td>
                <td>
                  <input type="number" disabled value={o.row4[2]} />
                </td>
                <td>
                  <input type="number" disabled value={o.row4[3]} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <br />

        {/* RESIDUAL */}

        {step == 1 && (
          <table>
            <tbody>
              <tr>
                <td>
                  <input disabled value={r.row1[0]} />
                </td>
                <td>
                  <input
                    type="text"
                    disabled
                    value={o.row1[1]}
                    onChange={e => this.setValues(e, 1, 1)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    disabled
                    value={o.row1[2]}
                    onChange={e => this.setValues(e, 1, 2)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <input
                    type="text"
                    disabled
                    value={o.row2[0]}
                    onChange={e => this.setValues(e, 2, 0)}
                  />
                </td>
                <td>
                  <input type="number" disabled value={r.row2[1]} />
                </td>
                <td>
                  <input
                    type="number"
                    disabled
                    value={r.row2[2]}
                    onChange={r => this.setValues(r, 2, 2)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <input
                    type="text"
                    disabled
                    value={o.row3[0]}
                    onChange={e => this.setValues(e, 3, 0)}
                  />
                </td>
                <td>
                  <input type="number" disabled value={r.row3[1]} />
                </td>
                <td>
                  <input type="number" disabled value={r.row3[2]} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <br />

        {/* chisquare */}

        {step == 1 && (
          <table>
            <tbody>
              <tr>
                <td>
                  <input disabled value={chi.row1[0]} />
                </td>
                <td>
                  <input
                    type="text"
                    disabled
                    value={chi.row1[1]}
                    onChange={chi => this.setValues(chi, 1, 1)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Home;
