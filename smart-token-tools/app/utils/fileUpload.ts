export namespace FileUpload {
  const MAX_FILE_SIZE = 100000000; // 100MB Image Size

  export const isImagePreviewFileType = (
    e: React.ChangeEvent<HTMLInputElement> | File,
  ): boolean => {
    if (e instanceof File) {
      const fileType = e.type;
      if (
        /image\/(.*)/.test(fileType) &&
        !/image\/(tiff|psd|vnd|adobe|photoshop)/.test(fileType)
      ) {
        return true;
      }
    } else {
      const fileType = e.target.files![0].type;
      if (
        /image\/(.*)/.test(fileType) &&
        !/image\/(tiff|psd|vnd|adobe|photoshop)/.test(fileType)
      ) {
        return true;
      }
    }
    return false;
  };

  export const isEmpty = (e: React.ChangeEvent<HTMLInputElement>): boolean => {
    if (!e.target || !e.target.files || !e.target.files[0]) {
      return true;
    }
    return false;
  };

  export const isMaxFileSize = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): boolean => {
    const file = e.target.files![0];
    return file.size > MAX_FILE_SIZE;
  };
}
