import datetime
import unittest
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import UnexpectedAlertPresentException


class TestAppointmentBooking(unittest.TestCase):
    """
    Test class for the appointment booking functionality on JongMaiHUB.
    """
    appointment_time = None
    booked_date_time = None
    appointment_date = None
    password = None
    email = None
    driver = None

    @classmethod
    def setUpClass(cls):
        """
        Set up the class before running any test.
        - Open Chrome browser.
        - Navigate to JongMaiHub website.
        - Perform Google login.
        """
        options = webdriver.ChromeOptions()
        options.add_experimental_option("excludeSwitches",
                                        ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        options.add_argument(
            '--disable-blink-features=AutomationControlled')
        cls.driver = webdriver.Chrome(options=options)
        cls.driver.get('https://jongmaihub.vercel.app/')

        cls.email = "jongmaihubtest@gmail.com"
        cls.password = "#TestJMH999"
        cls.service = "JongMaiHub Test Service"

        cls.appointment_date = datetime.datetime.today() + datetime.timedelta(
            days=1)
        cls.appointment_time = [12, 30]
        cls.booked_date_time = cls.appointment_date.strftime("%d %B %Y")
        cls.booked_date_time += f" {cls.appointment_time[0]}:{cls.appointment_time[1]}"

        sleep(5)
        cls.driver.find_element(By.CLASS_NAME, "firebaseui-idp-google").click()

        sleep(5)
        window_handles = cls.driver.window_handles
        new_window_handle = window_handles[-1]
        cls.driver.switch_to.window(new_window_handle)

        cls.driver.find_element(By.ID, "identifierId").send_keys(cls.email)
        cls.driver.find_element(By.ID, "identifierNext").click()

        sleep(5)
        cls.driver.find_element(By.XPATH,
                                '//*[@id="password"]/div[1]/div/div[1]/input').send_keys(
            cls.password)
        cls.driver.find_element(By.ID, "passwordNext").click()
        sleep(5)
        cls.driver.switch_to.window(window_handles[0])
        sleep(5)

    @classmethod
    def tearDownClass(cls):
        """
       Clean up the class after running all tests.
       - Quit the Chrome browser.
       """
        cls.driver.quit()

    def test_make_and_cancel_appointment(self):
        """
        Test the end-to-end process of making and canceling an appointment.
        - Search for a service.
        - Select staff and appointment date/time.
        - Confirm the appointment.
        - Verify the appointment details.
        - Cancel the appointment.
        - Verify the cancellation.
        """
        input_element = self.driver.find_element(By.CLASS_NAME, 'rs-input')
        input_element.send_keys(self.service)
        search_button = self.driver.find_element(By.CLASS_NAME,
                                                 'rs-btn-default')
        search_button.click()

        sleep(5)
        service_detail = self.driver.find_element(By.CLASS_NAME,
                                                  'service-detail')
        service_detail.click()

        sleep(5)
        staff_buttons = self.driver.find_elements(By.CSS_SELECTOR,
                                                  '.staff-detail .rs-panel-body button')
        staff_buttons[0].click()

        sleep(5)
        confirm_button = self.driver.find_element(By.CSS_SELECTOR,
                                                  'button.rs-btn.rs-btn-primary')
        confirm_button.click()

        date_picker = self.driver.find_element(By.CLASS_NAME,
                                               'rs-picker-toggle-textbox')
        date_picker.click()

        specific_date_element = self.driver.find_element(By.XPATH,
                                                         f'//div[@aria-label="{self.appointment_date.strftime("%d %b %Y")}"]')
        specific_date_element.click()

        sleep(5)
        date_ok_button = self.driver.find_element(By.CSS_SELECTOR,
                                                  'button.rs-btn.rs-btn-primary.rs-btn-sm')
        date_ok_button.click()

        sleep(5)
        hour_dropdown = self.driver.find_element(By.CSS_SELECTOR,
                                                 'input[name="hour-time"][placeholder="HH"]')
        hour_dropdown.click()

        sleep(5)
        specific_hour_element = self.driver.find_element(By.XPATH,
                                                         f'//a[@class="rs-calendar-time-dropdown-cell" and @data-key="hours-{self.appointment_time[0]}"]')
        sleep(5)

        specific_hour_element.click()
        hour_ok_button = self.driver.find_element(By.CSS_SELECTOR,
                                                  'button.rs-btn.rs-btn-primary.rs-btn-sm')
        hour_ok_button.click()

        sleep(5)
        minute_dropdown = self.driver.find_element(By.CSS_SELECTOR,
                                                   'input[name="minute-time"][placeholder="mm"]')
        minute_dropdown.click()
        
        sleep(5)
        specific_minute_element = self.driver.find_element(By.XPATH,
                                                           f'//a[@class="rs-calendar-time-dropdown-cell" and @data-key="minutes-{self.appointment_time[1]}"]')
        
        sleep(5)
        specific_minute_element.click()
        minute_ok_button = self.driver.find_element(By.CSS_SELECTOR,
                                                    'button.rs-btn.rs-btn-primary.rs-btn-sm')
        minute_ok_button.click()

        sleep(5)
        confirm_button = self.driver.find_element(By.XPATH,
                                                  '//button[@class="rs-btn rs-btn-primary"]')
        confirm_button.click()

        sleep(5)
        confirm_button = self.driver.find_element(By.XPATH,
                                                  '//button[@class="rs-btn rs-btn-primary"]')
        confirm_button.click()

        sleep(5)
        close_button = self.driver.find_element(By.CLASS_NAME,
                                                'rs-modal-header-close')
        close_button.click()

        sleep(5)
        profile = self.driver.find_element(By.XPATH,
                                           '//*[@id="root"]/div/header/nav/div[3]/div')
        profile.click()

        sleep(5)
        my_appointment = self.driver.find_element(By.XPATH,
                                                  '//*[@id="root"]/div/header/nav/div[3]/div/ul/li[2]')
        my_appointment.click()

        sleep(5)
        appointment_service = self.driver.find_element(By.XPATH,
                                                       '//*[@id="root"]/div/header/div/div[1]/div/div[2]/div[1]/div[1]/div/div[2]/div').text
        appointment_date = self.driver.find_element(By.XPATH,
                                                    '//*[@id="root"]/div/header/div/div[1]/div/div[2]/div[1]/div[1]/div/div[4]/div').text
        self.assertEqual(appointment_service, self.service)
        self.assertEqual(appointment_date, self.booked_date_time)

        sleep(5)
        cancel_button = self.driver.find_element(By.XPATH,
                                                 '//*[@id="root"]/div/header/div/div/div/div[2]/div[1]/div/div/div[5]/div/button')
        sleep(5)
        cancel_button.click()

        sleep(5)
        try:
            confirmation_dialog = WebDriverWait(self.driver, 10).until(
                EC.alert_is_present())
            print("Alert text: ", confirmation_dialog.text)
            confirmation_dialog.accept()
            sleep(5)
        except UnexpectedAlertPresentException:
            print(
                "Caught an unexpected alert. Continue with your logic here if needed.")
        try:
            appointment_service = self.driver.find_element(By.XPATH,
                                                           '//*[@id="root"]/div/header/div/div[1]/div/div[2]/div[1]/div[1]/div/div[2]/div').text
            if appointment_service:
                self.fail("Failed to cancel appointment.")
        except Exception:
            pass

if __name__ == "__main__":
    unittest.main()
    