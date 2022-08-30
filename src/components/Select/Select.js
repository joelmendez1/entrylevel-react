import React from "react";
import "./select.css";
import { getAllAttributes } from "../../queries/getAllData";
import { Loader } from "../Loader/Loader";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
      loading: true,
    };
  }
  componentDidMount() {
    getAllAttributes(this.props.productId).then((response) => {
      this.setState({
        attributes: response,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div className="select">
        <p>
          <strong className="select_attribute-title">
            {this.props.attribute.name}:
          </strong>
        </p>
        {this.renderSelector()}
      </div>
    );
  }

  renderSelector() {
    const { type, attribute, selectedProduct, onChange } = this.props;
    const { attributes, loading } = this.state;

    return (
      <div className="select_attributes">
        {loading ? (
          <Loader />
        ) : (
          attributes.items.map((item) => {
            if (type === "swatch") {
              return (
                <div
                  key={`select_attributes-${item.id}-${attribute.id}`}
                  style={{
                    background:
                      item.value === "#FFFFFF" ? "#c4bebe" : item.value,
                  }}
                  className={`select_swatch ${
                    selectedProduct[attribute.id] === item.value &&
                    "item-swatch"
                  }`}
                  onClick={() => {
                    onChange &&
                      onChange({
                        ...selectedProduct,
                        [attribute.name]: item.value,
                      });
                  }}
                />
              );
            } else {
              return (
                <div
                  key={`select_attributes-${item.id}-${attribute.id}`}
                  className={`select_non-swatch ${
                    selectedProduct[attribute.id] === item.value &&
                    "item-non-swatch"
                  }`}
                  onClick={() => {
                    onChange &&
                      onChange({
                        ...selectedProduct,
                        [attribute.name]: item.value,
                      });
                  }}
                >
                  <p>{item.value}</p>
                </div>
              );
            }
          })
        )}
      </div>
    );
  }
}

export { Select };
