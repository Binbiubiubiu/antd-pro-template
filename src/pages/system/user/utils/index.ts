export const getNoParentChild = (source: MenuTableItem[], target: string[]) => {
  if (!source || source.length === 0) {
    return target;
  }
  const targetArr = target.slice(0);

  const merge = (arr: MenuTableItem[]) => {
    arr.forEach((item: MenuTableItem) => {
      if (item.children && item.children.length !== 0) {
        targetArr.splice(targetArr.indexOf(String(item.id)), 1);
        merge(item.children);
      }
    });
  };

  merge(source);

  return targetArr;
};
