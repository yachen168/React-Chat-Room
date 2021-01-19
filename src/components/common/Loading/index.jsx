import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

import './index.scss';

const spinner = css`
  display: block;
  margin: 0 auto;
  border-color: #666;
`;

function Loading() {
  return (
    <div className="loading">
      <BeatLoader css={spinner} size={20} />
    </div>
  );
}

export default Loading;