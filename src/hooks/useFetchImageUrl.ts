import { useEffect, useState } from 'react';
import { getUrlByUri } from '@/easy-components/EasyImage/service';

export default function useFetchImageUrl(searchForm: { uri: string }, initSrc: string = '') {
  const [httpSrc, setHttpSrc] = useState<string>(initSrc);

  useEffect(() => {
    if (!searchForm.uri) {
      return;
    }
    getUrlByUri(searchForm).then(res => {
      setHttpSrc(res.data || '');
    });
  }, []);

  return [httpSrc];
}
