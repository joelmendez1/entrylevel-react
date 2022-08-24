import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import { get } from "../../queries/getAllData";
import { checkSessionData } from "../../utils/sessionStorage";
import Brand from "../../assets/Group.svg";
import Currency from "../svgComponents/Currency";
import CartIcon from "../svgComponents/CartIcon";
import { connect } from "react-redux";
import { setURL } from "../../redux/nav/navActions";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      pathName: "",
    };
  }

  componentDidMount() {
    (JSON.parse(sessionStorage.getItem("name"))
      ? checkSessionData("name")
      : get("name")
    )
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
        <ul className="navigator">
          {categories.map((category, index) => {
            const categoryName = category.name;
            return (
              <li
                key={index}
                className={
                  categoryName === window.location.pathname.slice(1)
                    ? "hovered"
                    : ""
                }
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
        <div className="actions">
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
