import React from 'react';
import { motion } from 'framer-motion';
import { slideRight, flipVariants } from '../../animations/animations';
import './WhiteOverlay.css';

function WhiteOverlay({ children, style, isFlipped, flipOnClick = false, visible=true, onClick=null, className=null }) {
  return (
    <div className={className}>
      {visible ? <>
        {flipOnClick ? (
          <motion.div
            className="overlay"
            style={style}
            initial="hidden"
            animate={isFlipped ? 'visible' : 'hidden'}
            variants={flipVariants}
            onClick={() => {onClick !== null ? onClick() : null}}
          >
            <motion.div
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className={"overlay " + className}
            style={style}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideRight}
            onClick={() => {onClick !== null ? onClick() : null}}
          >
            {children}
          </motion.div>
        )}
      </>: children}
    </div>
  );
}

export default WhiteOverlay;
