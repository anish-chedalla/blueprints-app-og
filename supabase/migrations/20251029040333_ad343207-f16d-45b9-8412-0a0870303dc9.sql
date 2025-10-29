UPDATE programs 
SET url = 'https://www.nase.org/become-a-member/member-benefits/business-resources/growth-grants'
WHERE LOWER(name) LIKE '%nase%' OR LOWER(sponsor) LIKE '%nase%';