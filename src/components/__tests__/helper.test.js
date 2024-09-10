import { findNthPrime, formatDate, timeToRead } from '../../conf/helper';

test('Prime function needs to return nth Prime Number', () => {
    const prime = findNthPrime(2);
    //Assertion
    expect(prime).toBe(3);
});

test('FormateDate function should return date in particular format', () => {
    const d = formatDate('2024-08-14T15:37:53.136+00:00');

    expect(d).toBe('Wed, Aug 14, 2024');
});

test('TimeToRead function should return time to read text in minutes', () => {
    const text =
        '<div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi nobis assumenda quidem sit, odio doloribus similique rerum voluptatum officia. Blanditiis corrupti, maxime iusto a illum debitis molestias voluptatum autem sapiente quia placeat rerum reprehenderit aliquam consequuntur beatae natus dignissimos quas animi eveniet vero ducimus sequi minima? Magni excepturi omnis soluta! Unde incidunt atque libero dolores eveniet sint quidem accusantium illum, suscipit mollitia architecto pariatur omnis quisquam deleniti ipsum autem eligendi error fugit voluptate nesciunt! Neque porro repellendus labore autem repudiandae quasi earum soluta, aliquam quisquam animi nisi deserunt itaque, aperiam tempora necessitatibus blanditiis! Sapiente quasi, quod explicabo harum in ducimus, accusantium asperiores fugiat odio officia non consectetur nemo dignissimos pariatur quam assumenda dolor qui velit eaque obcaecati quo exercitationem? Dolorum obcaecati earum excepturi velit provident hic recusandae fugit. Animi numquam, consequuntur at tempore eligendi eveniet commodi error, ea, quae maiores ipsa. Quod dolore placeat rem, consectetur velit at obcaecati, nobis exercitationem accusantium aliquam aperiam dolorum debitis illo iure eaque adipisci, eius asperiores perspiciatis ab. Ipsam facere dicta molestias nam tempore dignissimos vero ad</p></div>';
    const time = timeToRead(text);

    expect(time).toBe('<1 min read');
});
