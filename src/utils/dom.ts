/**
 * trigger element
 * popup components
 *
 * 先获取到当前trigger element的位置, 在共同的父组件中设置ref获取
 */
import { Component, ReactInstance } from 'react';
import ReactDOM from 'react-dom';

export const isDom = (node: any) => {
  return node instanceof HTMLElement;
};

export const findNode = (node: ReactInstance | HTMLElement) => {
  if (isDom(node)) {
    return node;
  }
  // react组件,则获取组件中的子节点直到为dom元素
  if (node instanceof Component) {
    return ReactDOM.findDOMNode(node);
  }

  return null;
};
