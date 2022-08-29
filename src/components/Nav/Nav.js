import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import { get } from "../../queries/getAllData";
import Brand from "../../assets/Group.svg";
import Currency from "../svgComponents/Currency";
import CartIcon from "../svgComponents/CartIcon";
import { connect } from "react-redux";
import { setURL } from "../../redux/nav/navActions";
import { getPathname } from "../../utils/utils";
import { getCategoriesName } from "../../queries/getCategoriesName";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      pathName: "",
    };
  }

  componentDidMount() {
    getCategoriesName()
      .then((res) => {
        this.setState({
          categories: res.categories,
        });
      })
      .catch((error) => {
        console.error("An error has ocurred: ", error);
      });
  }

  render() {
    const { categories } = this.state;
    const { setURL } = this.props;

    return (
      <nav>
        <ul>
          {categories.map((category, index) => {
            const categoryName = category.name;
            return (
              <li
                key={index}
                className={getPathname(categoryName) ? "hovered" : ""}
              >
                <Link
                  to={categoryName}
                  onClick={() => {
                    setURL(categoryName);
                    this.setState({
                      pathName: categoryName,
                    });
                  }}
                >
                  {categoryName}
                </Link>
              </li>
            );
          })}
        </ul>
        <img src={Brand} alt="logo" />
        <div className="nav_actions">
          <Currency />
          <CartIcon />
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setURL: (url) => dispatch(setURL(url)),
  };
};

export default connect(null, mapDispatchToProps)(Nav);
