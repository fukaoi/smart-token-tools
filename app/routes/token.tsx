// import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import TitleTypography from "~/components/typography/TitleTypography";
import AddressTypography from "~/components/typography/AddressTypography";
import ClusterRadio from "~/components/radio/ClusterRadio";
import TotalSupplyTextField from "~/components/number-input/TotalSupplyTextField";
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
import type { TokenMetadata } from "~/types";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "@remix-run/react";
import { mintToken } from "~/utils/mint-token";
import type { GenericFile } from "@metaplex-foundation/umi";
import DecimalsInput from "~/components/number-input/DecimalsInput";
import { useStorage } from "~/utils/storage";
import DescriptionTypography from "~/components/typography/DescriptionTypography";
import MetadataJsonUrlTextField from "~/components/text-field/MetadataJsonUrlTextField";

const Token = () => {
  const btnTitle = "SUBMIT";
  const [address, setAddress] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const navigate = useNavigate();
  const [btnState, setBtnState] = useState({
    title: btnTitle,
    isDisabled: false,
  });
  const { wallet } = useWallet();
  const [storage, setStorage] = useStorage("network");
  const [completeModal, setCompleteModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const [imagePreview, setImagePreview] = useState<File | string | undefined>(
    undefined
  );
  const [genericFile, setGenericFile] = useState<GenericFile>();
  const [loading, setLoading] = useState({ isLoading: false, message: "" });
  const [showImageUpload, setShowImageUpload] = useState<boolean | undefined>(
    undefined
  );
  const { handleSubmit, control } = useForm<TokenMetadata>({
    defaultValues: {
      cluster: storage.cluster,
      customClusterUrl: storage.customClusterUrl,
      name: "",
      symbol: "",
      metadataJsonUrl: "",
      totalSupply: 1_000_000_000,
      decimals: 5,
    },
  });

  const { publicKey } = useWallet();
  const description =
    "TOKEN is minted using token extensions, and the metadata is uploaded to Arweave";

  useEffect(() => {
    if (publicKey) {
      setAddress(publicKey.toString());
    } else {
      navigate("/");
    }
  }, [publicKey, navigate]);

  const handleProcessing = (message: string) => {
    setLoading({ isLoading: true, message });
  };

  const handleErrorClose = () => {
    setErrorModal({ open: false, message: "" });
    setBtnState({ title: btnTitle, isDisabled: false });
  };

  const handleSuccessClose = () => {
    setLoading({ isLoading: false, message: "" });
    setCompleteModal(false);
    setBtnState({ title: btnTitle, isDisabled: false });
  };

  const handleImageUploadChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowImageUpload(event.target.value === "image");
  };

  const onSubmit = async (data: TokenMetadata) => {
    setBtnState({ title: "PROCESSING", isDisabled: true });
    setStorage({
      cluster: data.cluster,
      customClusterUrl: data.customClusterUrl,
    });

    try {
      data.file = genericFile!;
      const res = await mintToken(wallet!.adapter, data, handleProcessing);
      console.debug("# sig: ", res.signature);
      setMintAddress(res.mint);
      res.signature.length !== 0 && setCompleteModal(true);
    } catch (error) {
      setBtnState({ title: "Submit", isDisabled: false });
      setLoading({ isLoading: false, message: "" });
      const errorMessage =
        (error as Error).message.length <= 1
          ? "An error occurred"
          : (error as Error).message;
      setErrorModal({ open: true, message: errorMessage });
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
            <DescriptionTypography message={description} />
            <ClusterRadio control={control} name="cluster" />
            <Box sx={{ mb: 4 }} />
            <NameTextField<TokenMetadata>
              control={control}
              name="name"
              rules={validationRules.name}
            />
            <Box sx={{ mb: 4 }} />
            <SymbolTextField
              control={control}
              name="symbol"
              rules={validationRules.symbol}
            />
            <Box sx={{ mb: 4 }} />
            <TotalSupplyTextField control={control} name="totalSupply" />
            <Box sx={{ mb: 4 }} />
            <DecimalsInput control={control} name="decimals" />
            <Box sx={{ mb: 4 }} />
            <HeadlineTypography message="Upload Image or Metadata URL" />
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleImageUploadChange}
            >
              <FormControlLabel
                value="image"
                control={<Radio />}
                label="Image"
              />
              <FormControlLabel
                value="metadata"
                control={<Radio />}
                label="Metadata URL"
              />
            </RadioGroup>
            {showImageUpload && (
              <ImageFileUploadUI
                {...{
                  imagePreview,
                  setErrorModal,
                  setImagePreview,
                  setGenericFileBuffer: setGenericFile,
                }}
              />
            )}
            {showImageUpload === false && (
              <MetadataJsonUrlTextField
                control={control}
                name="metadataJsonUrl"
                // rules={validationRules.description}
              />
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
      {completeModal && (
        <CompletedMintModal
          open={completeModal}
          onClose={handleSuccessClose}
          mint={mintAddress}
        />
      )}
      {errorModal && (
        <ErrorModal
          open={errorModal.open}
          onClose={handleErrorClose}
          message={errorModal.message}
        />
      )}
      <Loading {...loading} />
      {/*   <DevTool control={control} /> */}
    </>
  );
};
export default Token;
