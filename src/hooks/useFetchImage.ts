import { useEffect, useState } from 'react';
import { getUrlByUri, getUrlByUriBatch } from '@/easy-components/EasyImage/service';

export function useFetchImageList(
  arr: string[] = [],
): [string[], (newArr: string[]) => void, boolean] {
  const [loading, setLoading] = useState<boolean>(false);
  const [httpSrc, setHttpSrc] = useState<string[]>(arr);

  const fetch = (newArr: string[]) => {
    if (!newArr || newArr.length === 0) {
      setHttpSrc([]);
      return;
    }
    setLoading(true);
    getUrlByUriBatch(newArr).then(res => {
      setHttpSrc(res.data || []);
      setLoading(false);
    });
  };

  return [httpSrc, fetch, loading];
}

export function useFetchImage(uri: string, isLocal = false): [string, boolean] {
  const [loading, setLoading] = useState<boolean>(false);
  const [httpSrc, setHttpSrc] = useState<string>(uri);

  const fetch = (newUri: string) => {
    if (!newUri) {
      setHttpSrc('');
      return;
    }

    setLoading(true);
    getUrlByUri({ uri: newUri }).then(res => {
      setHttpSrc(res.data || '');
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!isLocal) {
      fetch(uri);
    } else {
      setHttpSrc(uri);
    }
  }, [uri]);

  return [httpSrc, loading];
}
