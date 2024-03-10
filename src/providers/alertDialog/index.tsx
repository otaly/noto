import { useDisclosure } from '@chakra-ui/react';
import { createContext, useCallback, useContext, useState } from 'react';
import { AlertDialog, AlertDialogProps } from './alertDialog';

type OpenAlertDialogConfig = Pick<
  AlertDialogProps,
  'title' | 'text' | 'okButtonText'
> & { onOk?: () => void; onCancel?: () => void };

type AlertDialogContext = {
  open: (config: OpenAlertDialogConfig) => void;
};

const alertDialogContext = createContext<AlertDialogContext>({
  open: () => {},
});

type AlertDialogProviderProps = {
  children: React.ReactNode;
};

export const AlertDialogProvider = ({ children }: AlertDialogProviderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [config, setConfig] = useState<OpenAlertDialogConfig>({ text: '' });

  const open = useCallback(
    (config: OpenAlertDialogConfig) => {
      setConfig(config);
      onOpen();
    },
    [onOpen],
  );

  return (
    <alertDialogContext.Provider value={{ open }}>
      {children}
      <AlertDialog
        isOpen={isOpen}
        title={config.title}
        text={config.text}
        okButtonText={config.okButtonText}
        onOk={() => {
          config.onOk?.();
          onClose();
        }}
        onCancel={() => {
          config.onCancel?.();
          onClose();
        }}
        onClose={onClose}
      />
    </alertDialogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlertDialog = () => {
  const { open } = useContext(alertDialogContext);

  return (config: Omit<OpenAlertDialogConfig, 'onOk' | 'onCancel'>) => {
    return new Promise<boolean>((resolve) =>
      open({
        ...config,
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      }),
    );
  };
};
