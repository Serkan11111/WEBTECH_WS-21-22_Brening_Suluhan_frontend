import { mount } from '@vue/test-utils'
import ToDoTable from '@/components/ToDoTable'
import ToDoModal from '@/components/ToDoModal'
import Home from '@/views/Home'

describe('Testing Home.vue', () => {
  it('should show page title', () => {
    // when
    const wrapper = mount(Home)

    // then
    expect(wrapper.text()).toMatch('ToDos')
  })

  it('should have toDo table component', () => {
    // when
    const wrapper = mount(Home)

    // then
    const table = wrapper.findComponent(ToDoTable)
    expect(table.exists()).toBeTruthy()
  })

})
