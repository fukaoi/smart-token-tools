import TitleTypography from "../components/typography/TitleTypography";
import {useSessionCheck} from "../hooks/SessionCheck";

const NftPage = () => {
  useSessionCheck(console.log);
  return (
    <>
      <TitleTypography title='NFT' />
      <h5>Sorry. Develop now</h5>
    </>
  );
};
export default NftPage;
