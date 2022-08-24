import React from 'react';
import './all.css';
import { get } from '../../queries/getAllData';
import Product from '../Product/Product';
import { checkSessionData } from '../../utils/sessionStorage';
import { connect } from 'react-redux';
import { Loader } from '../Loader/Loader';

class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
  }

  componentDidMount() {
    (JSON.parse(sessionStorage.getItem('all'))
      ? checkSessionData('all')
      : get('all')
    )
      .then((res) => {
        this.setState({
          products: res.categories,
          loading: false,
        });
      })
      .catch((error) => {
        console.error('An error has ocurred: ', error);
      });
  }

  render() {
    const { products, loading } = this.state;
    const { currentURL, currentBackground } = this.props;
    const categoryName =
      window.location.pathname.slice(1) || 'WELCOME';

    return (
      <main className="all" style={{ background: currentBackground }}>
        {!loading ? (
          <div className="all-products-container">
            <h1 className="all-title">{categoryName}</h1>
            <section className="all-products">
              {products.map((element) => {
                const categoryName = element.name;
                if (categoryName === currentURL) {
                  return element.products.map((product, index) => (
                    <Product
                      key={`product-${product.name}-${index}`}
                      {...product}
                    />
                  ));
                }
                return;
              })}
            </section>
          </div>
        ) : (
          <Loader />
        )}
      </main>
    );
  }
}

const mapStateToProps = ({
  navPersistReducer,
  backgroundReducer,
}) => {
  return {
    currentURL: navPersistReducer.currentURL,
    currentBackground: backgroundReducer.currentBackground,
  };
};

export default connect(mapStateToProps)(All);
