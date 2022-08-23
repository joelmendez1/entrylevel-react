import React from "react";
import "./select.css";

class Select extends React.Component {
  render() {
    return (
      <div className="select">
        <p>
          <strong>{this.props.attribute.name}:</strong>
        </p>
        {this.renderSelector()}
      </div>
    );
  }

  renderSelector() {
    const { type, attribute, selectedProducts, onChange } = this.props;

    return (
      <div className="select_attributes">
        {attribute.items.map((item, index) => {
          if (type === "swatch") {
            return (
              <div
                key={`select_attributes-${item.value}-${index}`}
                style={{
                  background: item.value === "#FFFFFF" ? "#c4bebe" : item.value,
                }}
                className={`select_swatch ${
                  Object.values(selectedProducts).includes(item.value) &&
                  "item-selected"
                }`}
                onClick={() => {
                  onChange &&
                    onChange({
                      ...selectedProducts,
                      [attribute.name]: item.value,
                    });
                }}
              />
            );
          } else {
            return (
              <div
                key={`select_attributes-${item.value}-${index}`}
                className={`select_non-swatch ${
                  Object.values(selectedProducts).includes(item.value) &&
                  "item-selected"
                }`}
                onClick={() => {
                  onChange &&
                    onChange({
                      ...selectedProducts,
                      [attribute.name]: item.value,
                    });
                }}
              >
                <p>{item.value}</p>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export { Select };
