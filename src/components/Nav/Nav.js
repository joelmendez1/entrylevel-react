import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import Brand from "../../assets/Group.svg";
import Currency from "../svgComponents/Currency";
import CartIcon from "../svgComponents/CartIcon";
import { connect } from "react-redux";
import { setURL } from "../../redux/nav/navActions";
import { getPathname } from "../../utils/utils";
import { Loader } from "../Loader/Loader";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: "",
    };
  }

  render() {
    const { setURL, categories, loading } = this.props;

    return (
      <nav>
        <ul>
          {loading ? (
            <Loader />
          ) : (
            categories.map((category, index) => {
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
            })
          )}
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
