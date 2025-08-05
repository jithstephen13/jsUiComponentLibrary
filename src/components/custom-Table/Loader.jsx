import React from 'react';
import { DrawerOverlay, Modal, AbsoluteCenter } from '@chakra-ui/react';
import Spinner from '../spinner';

const Loader = (isLoading = false) => {
  return (
    <Modal isCentered isOpen={isLoading} onClose={isLoading}>
      <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(1px)">
        <AbsoluteCenter axis="both">
          <Spinner thickness="4px" speed="0.65s" emptyColor="primary.200" color="secondary.500" size="xl" />
        </AbsoluteCenter>
      </DrawerOverlay>
    </Modal>
  );
};

export default Loader;
