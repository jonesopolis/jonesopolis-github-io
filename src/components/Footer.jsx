import { useEffect, useState } from 'react';
import { getFooter } from '../contentful';

export default function Footer() {
  const [footer, setFooter] = useState({ copyright: '', tagline: '' });

  useEffect(() => {
    getFooter().then(setFooter);
  }, []);

  return (
    <footer>
      <p>{footer.copyright}</p>
    </footer>
  );
}
