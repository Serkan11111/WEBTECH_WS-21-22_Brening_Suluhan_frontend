import { mount } from '@vue/test-utils'
import ToDoModal from '@/components/ToDoModal'

describe('Testing ToDoModal.vue', () => {
  it('should not show form by default', () => {
    // when
    const wrapper = mount(ToDoModal)

    // then
    expect(wrapper.find('#to-do-modal').classes()).not.toContain('show')
  })
})
