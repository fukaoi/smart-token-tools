import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { Box, FormControl, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import TitleTypography from "~/components/typography/TitleTypography";
import AddressTypography from "~/components/typography/AddressTypography";
import ClusterRadio from "~/components/radio/ClusterRadio";
import TokenIssueTypeRadio from "~/components/radio/TokenIssueTypeRadio";
import TotalSupplyTextField from "~/components/number-input/TotalSupplyTextField";
import DecimalsTextField from "~/components/text-field/DecimalsTextField";
import TokenAddressTextField from "~/components/text-field/TokenAddressTextField";
import SubmitButton from "~/components/button/SubmitButton";
import Loading from "~/components/animation/Loading";
import ErrorModal from "~/components/modal/ErrorModal";
import CompletedMintModal from "~/components/modal/CompletedMintModal";
import NameTextField from "~/components/text-field/NameTextField";
import SymbolTextField from "~/components/text-field/SymbolTextField";
import HeadlineTypography from "~/components/typography/HeadlineTypography";
import ImageFileUploadUI from "~/components/parts/ImageFileUploadUI";
import { validationRules } from "~/utils/validation";
import { TokenMetadata } from "~/types";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "@remix-run/react";
import { mintToken } from "~/utils/mint-token";
import { GenericFile } from "@metaplex-foundation/umi";
import DecimalsInput from "~/components/number-input/DecimalsInput";

const Token = () => {
  const btnTitle = "SUBMIT";
  const [address, setAddress] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnState, setBtnState] = useState({
    title: btnTitle,
    isDisabled: false,
  });
  const { wallet } = useWallet();
  const [completeModal, setCompleteModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const [imagePreview, setImagePreview] = useState<File | string | undefined>(
    undefined
  );
  const [genericFile, setGenericFile] = useState<GenericFile>();
  const { handleSubmit, control, watch } = useForm<TokenMetadata>({
    defaultValues: {
      cluster: "",
      customClusterUrl: "",
      issueType: "new",
      name: "",
      symbol: "",
      totalSupply: 1_000_000_000,
      decimals: 5,
      tokenAddress: "",
    },
  });

  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      setAddress(publicKey.toString());
    } else {
      navigate("/");
    }
  }, [publicKey]);

  const handleErrorClose = () => {
    setErrorModal({ open: false, message: "" });
    setBtnState({ title: btnTitle, isDisabled: false });
  };

  const handleSuccessClose = () => {
    setIsLoading(false);
    setCompleteModal(false);
    setBtnState({ title: btnTitle, isDisabled: false });
  };

  // const onSubmit = async (data: TokenMetadata) => {
  const onSubmit = async (data: any) => {
    console.log(data);
    setBtnState({ title: "PROCESSING", isDisabled: true });
    setIsLoading(true);

    if (data.issueType === "new" && !genericFile) {
      setErrorModal({ open: true, message: "Please Image Upload" });
    }

    try {
      if (data.issueType === "new") {
        data.file = genericFile!;
        const res = await mintToken(wallet!.adapter, data);
        setMintAddress(res.mint);
        res.signature.length !== 0 && setCompleteModal(true);
      } else if (data.issueType === "add" && data.tokenAddress) {
        // mint = await addMinting(
        //   data.tokenKey,
        //   address,
        //   data.cluster,
        //   data.totalSupply,
        //   data.decimals,
        // );
      } else {
        setIsLoading(false);
        setErrorModal({ open: true, message: "Error no match issue type" });
      }
    } catch (error) {
      setBtnState({ title: "Submit", isDisabled: false });
      setIsLoading(false);
      setErrorModal({ open: true, message: (error as Error).message });
      console.error("# mintToken: ", error);
    }
  };

  return (
    <>
      <TitleTypography title="TOKEN" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Paper
            sx={{
              marginTop: "1em",
              minWidth: "20em",
              maxWidth: "20em",
              padding: "1.2em",
            }}
          >
            <AddressTypography address={address} />
            <ClusterRadio control={control} name="cluster" />
            <Box sx={{ mb: 4 }} />
            <TokenIssueTypeRadio control={control} name="issueType" />
            <Box sx={{ mb: 4 }} />
            {watch("issueType") === "new" && (
              <>
                <Box sx={{ mb: 1 }} />
                <NameTextField<TokenMetadata>
                  control={control}
                  name="name"
                  rules={validationRules.name}
                />
              </>
            )}
            <Box sx={{ mb: 4 }} />
            {watch("issueType") === "new" && (
              <>
                <Box sx={{ mb: 1 }} />
                <SymbolTextField
                  control={control}
                  name="symbol"
                  rules={validationRules.symbol}
                />
              </>
            )}
            <Box sx={{ mb: 4 }} />
            <TotalSupplyTextField control={control} name="totalSupply" />
            <Box sx={{ mb: 4 }} />

            <DecimalsInput control={control} name="decimals" />
            {watch("issueType") === "add" && (
              <>
                <Box sx={{ mb: 4 }} />
                <TokenAddressTextField control={control} name="tokenAddress" />
              </>
            )}
            <Box sx={{ mb: 4 }} />

            {watch("issueType") === "new" && (
              <>
                <HeadlineTypography message="Image Upload" />
                <Box sx={{ mb: 4 }} />
                <ImageFileUploadUI
                  {...{
                    imagePreview,
                    setErrorModal,
                    setImagePreview,
                    setGenericFileBuffer: setGenericFile,
                  }}
                />
              </>
            )}
          </Paper>
          <Box sx={{ mb: 6 }} />
          <Box>
            <SubmitButton
              isDisabled={btnState.isDisabled}
              title={btnState.title}
            />
          </Box>
          <Box sx={{ mb: 10 }} />
        </FormControl>
      </form>
      <DevTool control={control} />
      <CompletedMintModal
        open={completeModal}
        onClose={handleSuccessClose}
        mint={mintAddress}
      />
      <ErrorModal
        open={errorModal.open}
        onClose={handleErrorClose}
        message={errorModal.message}
      />
      <Loading isLoading={isLoading} />
    </>
  );
};
export default Token;
