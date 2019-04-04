import { h, Component } from "preact";
import style from "./style";
import BigBinom from "bigbinom";
import Chart from "../../components/Chart";

const sumStrings = (str1, str2) =>
  Number.parseFloat(str1) + Number.parseFloat(str2);

const getExpected = (str1, str2, str3) => {
  const expected =
    (Number.parseFloat(str1) * Number.parseFloat(str2)) /
    Number.parseFloat(str3);

  return expected.toFixed(2);
};

const getRelative = (str1, str2) => {
  const relative = (Number.parseFloat(str1) / Number.parseFloat(str2)) * 100;

  return relative.toFixed(2);
};

const getRelativeSums = (str1, str2) => {
  const relativeSums = Number.parseFloat(str1) + Number.parseFloat(str2);

  return relativeSums.toFixed(2);
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

const getPhisquare = (str1, str2) => {
  const phisquare = Number.parseFloat(str1) / Number.parseFloat(str2);
  return phisquare.toFixed(3);
};

function rFact(num) {
  var rval = 1;
  for (var i = 2; i <= num; i++) rval = rval * i;
  return rval;
}

//significant condition
var isSignificant = function(chisquare) {
  if (chisquare < 3.841) {
    return "result is not significant";
  } else {
    return "result is significant";
  }
};

const getFisher = (str1, str2, str3, str4, str5) => {
  str1 = Number.parseFloat(str1);
  str2 = Number.parseFloat(str2);
  str3 = Number.parseFloat(str3);
  str4 = Number.parseFloat(str4);

  var bn1 = new BigBinom(str1 + str2, str1),
    bn2 = new BigBinom(str3 + str4, str3),
    bn3 = new BigBinom(str1 + str2 + str3 + str4, str1 + str3);

  return bn1
    .times(bn2)
    .dividedBy(bn3)
    .toFixed(4);

  // const sum1 =
  //   rFact(Number.parseFloat(str1) + Number.parseFloat(str2)) *
  //   rFact(Number.parseFloat(str3) + Number.parseFloat(str4)) *
  //   rFact(Number.parseFloat(str1) + Number.parseFloat(str3)) *
  //   rFact(Number.parseFloat(str2) + Number.parseFloat(str4));
  // console.log(sum1);

  // const sum2 =
  //   rFact(Number.parseFloat(str2)) *
  //   rFact(Number.parseFloat(str3)) *
  //   rFact(Number.parseFloat(str4)) *
  //   rFact(Number.parseFloat(str5));

  // console.log(sum2);

  // const fisher = sum1.toFixed(1) / sum2.toFixed(1);
  // console.log(fisher);

  // return fisher.toFixed(3);
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

    relative: {
      row1: ["Relative (%)", "", "", "Totals (%)"],
      row2: ["", null, null, null],
      row3: ["", null, null, null],
      row4: ["Totals (%)", null, null, null]
    },

    residual: {
      row1: ["Residual", "", ""],
      row2: ["", null, null],
      row3: ["", null, null]
    },

    chisquare: {
      row1: ["Chi-square", null, null]
    },

    phisquare: {
      row1: ["Phi-square", null]
    },

    fisher: {
      row1: ["Fisher Exact Test(one-tailed)", null]
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
    let {
      observed: o,
      expected: e,
      relative: rel,
      residual: r,
      chisquare: chi,
      phisquare: phi,
      fisher: fish
    } = this.state;

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

    // relative
    rel.row2[1] = getRelative(o.row2[1], o.row4[3]);
    rel.row2[2] = getRelative(o.row2[2], o.row4[3]);

    rel.row3[1] = getRelative(o.row3[1], o.row4[3]);
    rel.row3[2] = getRelative(o.row3[2], o.row4[3]);

    //relativesums
    rel.row2[3] = getRelativeSums(rel.row2[1], rel.row2[2]);
    rel.row3[3] = getRelativeSums(rel.row3[1], rel.row3[2]);

    rel.row4[1] = getRelativeSums(rel.row2[1], rel.row2[2]);
    rel.row4[2] = getRelativeSums(rel.row3[1], rel.row3[2]);

    rel.row4[3] = getRelativeSums(rel.row4[1], rel.row4[2]);

    // residual
    r.row2[1] = getResidual(o.row2[1], e.row2[1], e.row2[1]);
    r.row2[2] = getResidual(o.row2[2], e.row2[2], e.row2[2]);

    r.row3[1] = getResidual(o.row3[1], e.row3[1], e.row3[1]);
    r.row3[2] = getResidual(o.row3[2], e.row3[2], e.row3[2]);

    // chisquare
    chi.row1[1] = getChisquare(r.row2[1], r.row2[2], r.row3[1], r.row3[2]);
    chi.row1[2] = isSignificant(chi.row1[1]);

    // phisquare
    phi.row1[1] = getPhisquare(chi.row1[1], o.row4[3]);

    // fisher
    fish.row1[1] = getFisher(
      o.row2[1],
      o.row2[2],
      o.row3[1],
      o.row3[2],
      e.row4[3]
    );
    console.log(fish.row1[1]);

    this.setState({
      observed: o,
      expected: e,
      relative: rel,
      residual: r,
      chisquare: chi,
      phisquare: phi,
      fisher: fish,
      step: 1
    });
  };

  render() {
    console.log(this.state);
    const {
      observed: o,
      expected: e,
      relative: rel,
      residual: r,
      chisquare: chi,
      phisquare: phi,
      fisher: fish,
      step
    } = this.state;

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

        {/* RELATIVE */}

        {step == 1 && (
          <table>
            <tbody>
              <tr>
                <td>
                  <input disabled value={rel.row1[0]} />
                </td>
                <td>
                  <input type="text" disabled value={o.row1[1]} />
                </td>
                <td>
                  <input type="text" disabled value={o.row1[2]} />
                </td>
                <td>
                  <input disabled value={rel.row1[3]} />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" disabled value={o.row2[0]} />
                </td>
                <td>
                  <input type="number" disabled value={rel.row2[1]} />
                </td>
                <td>
                  <input
                    type="number"
                    disabled
                    value={rel.row2[2]}
                    onChange={rel => this.setValues(rel, 2, 2)}
                  />
                </td>
                <td>
                  <input disabled value={rel.row2[3]} />
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
                  <input type="number" disabled value={rel.row3[1]} />
                </td>
                <td>
                  <input type="number" disabled value={rel.row3[2]} />
                </td>
                <td>
                  <input disabled value={rel.row3[3]} />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" disabled value={rel.row4[0]} />
                </td>
                <td>
                  <input type="number" disabled value={rel.row4[1]} />
                </td>
                <td>
                  <input type="number" disabled value={rel.row4[2]} />
                </td>
                <td>
                  <input disabled value={rel.row4[3]} />
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
                  <input type="text" disabled value={chi.row1[1]} />
                </td>
                <td>
                  <input type="text" disabled value={chi.row1[2]} />
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* phisquare */}

        {step == 1 && (
          <table>
            <tbody>
              <tr>
                <td>
                  <input disabled value={phi.row1[0]} />
                </td>
                <td>
                  <input
                    type="text"
                    disabled
                    value={phi.row1[1]}
                    onChange={phi => this.setValues(phi, 1, 1)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* fisher test */}

        {step == 1 && (
          <table>
            <tbody>
              <tr>
                <td>
                  <input disabled value={fish.row1[0]} />
                </td>
                <td>
                  <input type="text" disabled value={fish.row1[1]} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {step == 1 && (
          <Chart
            data={[
              {
                name: o.row1[1],
                uv: o.row2[1],
                pv: o.row2[2],
              
              },
              {
                name: o.row1[2],
                uv: o.row3[1],
                pv: o.row3[2],
              }
            ]}
          />
        )}
      </div>
    );
  }
}

export default Home;
