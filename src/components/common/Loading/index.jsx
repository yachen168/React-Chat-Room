import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

import './index.scss';

const spinner = css`
  display: block;
  margin: 0 auto;
  border-color: #666;
`;

function Loading({loading}) {
  return (
    <div className="loading">
      <BeatLoader 
        color="#000"
        loading={loading} 
        css={spinner} size={20} 
      />
    </div>
  );
}

export default Loading;