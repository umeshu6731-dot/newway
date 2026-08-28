import io

p = 'projects.html'
s = io.open(p, encoding='utf-8').read()

AMP = '&' + 'amp;'  # build HTML entity without embedding it literally

cards = [
    ('images/project-1.jpg?v=2', 'Commercial Landscaping', '01'),
    ('images/project-2.jpg?v=2', 'Horticulture', '02'),
    ('images/project-3.jpg?v=2', 'Event Management', '03'),
    ('images/project-4.jpg?v=2', 'Housekeeping', '04'),
    ('images/project-5.jpg?v=2', 'Maintenance', '05'),
    ('images/project-6.jpg?v=2', 'Solar Solutions', '06'),
]

for src, title, num in cards:
    old_img = '<img src="' + src + '" alt="' + title + '">'
    new_img = '<img src="' + src + '" alt="' + title + '" loading="lazy" decoding="async">'
    assert old_img in s, 'NOT FOUND: ' + old_img
    s = s.replace(old_img, new_img)

    old_span = '<span>' + title + '</span><h3>' + title + '</h3>'
    new_span = '<span>' + num + '</span><h3>' + title + '</h3>'
    assert old_span in s, 'NOT FOUND: ' + old_span
    s = s.replace(old_span, new_span)

# sanity check: entities untouched
assert AMP + ' garden development' in s
assert AMP + ' Developed by' in s

io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('OK: 6 project cards updated')