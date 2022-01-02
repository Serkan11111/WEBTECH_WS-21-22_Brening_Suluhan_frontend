import { mount } from '@vue/test-utils'
import ToDoTable from '@/components/ToDoTable'

describe('Testing ToDoTable.vue', () => {
  it('should render a to do row for each to do', () => {
    // when
    const wrapper = mount(ToDoTable, {
      propsData: {
        persons: [
          {
            id: 1,
            titel: 'Projekt',
            description: 'Website gestalten',
            module: 'Webtech',
            date: '2022-01-09',
            favorite: false,
            done: false
          },
          {
            id: 2,
            titel: 'Meilenstein 5',
            description: 'Seite zum laufen bringen',
            module: 'Webtech',
            date: '2022-01-09',
            favorite: false,
            done: false
          }
        ]
      }
    })

    // then
    const toDoTable = wrapper.findAllComponents(ToDoTable)
    expect(toDoTable.length).toBe(2)
  })
})
