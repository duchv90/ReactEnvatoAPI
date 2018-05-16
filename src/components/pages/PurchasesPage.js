import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import api from '../../api';
import { fetchAuthorSales } from '../../actions/purchases';

class HomePage extends React.Component {
  state = {
    purchaseCode: '',
    errors: {}
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.purchaseCode)
      this.setState({ errors: { purchaseCode: 'You must specify a purchase code.' } });
    else
      this.props.fetchAuthorSales(this.state.purchaseCode);
  };

  render() {
    const { purchaseCode, errors } = this.state;
    const { data } = this.props;

    return (
      <main className="main-content">
        <div className="purchases">
          <div className="container">
            <div className="card">
              <div className="card-body">
                <form className="mb-3" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label htmlFor="purchaseCode" className="col-sm-4 col-form-label text-right">Purchase code</label>
                        <div className="col-sm-8">
                          <input
                            onChange={this.handleChange}
                            id="purchaseCode"
                            className={`form-control ${errors.purchaseCode && 'is-invalid'}`}
                            value={purchaseCode}
                            name="purchaseCode"
                            type="text"
                            required
                          />
                          {errors.purchaseCode && <div className="invalid-feedback">{errors.purchaseCode}</div>}
                        </div>
                      </div>
                      <div className="row justify-content-end">
                        <div className="col-sm-8">
                          <button className="btn btn-primary" type="submit">
                            <i className="ion-search"/>Check sale
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                {data && (
                  <ul className="sale-information list-group list-group-flush">
                    <li className="list-group-item list-group-item-primary">
                      <strong>Buyer: </strong> {data.buyer}
                    </li>
                    <li className="list-group-item">
                      <strong>Item name: </strong> {data.item.name}
                    </li>
                    <li className="list-group-item">
                      <strong>Amount: </strong> {parseFloat(data.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </li>
                    <li className="list-group-item">
                      <strong>Support Amount: </strong> {parseFloat(data.support_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </li>
                    <li className="list-group-item">
                      <strong>Support Until: </strong> {moment(data.supported_until).format('YYYY-MM-DD')}
                    </li>
                    <li className="list-group-item">
                      <strong>Sold At: </strong> {moment(data.sold_at).format('YYYY-MM-DD')}
                    </li>
                    <li className="list-group-item">
                      <strong>License: </strong> {data.license}
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

HomePage.propTypes = {
  fetchAuthorSales: PropTypes.func.isRequired,
  data: PropTypes.shape.isRequired
}

const mapStateToProps = (state) => ({
  data: state.purchases.sale
});

export default connect(mapStateToProps, { fetchAuthorSales })(HomePage);
