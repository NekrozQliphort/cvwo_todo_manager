# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.create(title: 'Study', remarks: 'Physics, Maths and Whatever', deadline: Date.new(2021, 2, 3))
t2 = Task.new(title: 'Study Again', remarks: 'STFU', deadline: Date.new(2021, 1, 27))
t2.save
t2.tags.create([{ name: 'Tag1' }, { name: 'Tag2' }])
