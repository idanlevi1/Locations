export default class Level {
  number = 1;
  status = false;
  attribute = "";
  type = "default";
  label = "?";
  maxLength = 10;
  successMsg = '';
  result = null;

  constructor(number, status, attribute, type, label, maxLength, successMsg) {
    this.number = number;
    this.status = status;
    this.attribute = attribute;
    this.type = type;
    this.label = label;
    this.maxLength = maxLength;
    this.successMsg = successMsg
  }
}
