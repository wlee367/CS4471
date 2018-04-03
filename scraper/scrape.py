from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import time
import csv
from datetime import datetime
import re
import json

def to_military(m):
    in_time = datetime.strptime(m, "%I:%M %p")
    out_time = datetime.strftime(in_time, "%H:%M")
    return out_time

url = "http://studentservices.uwo.ca/secure/timetables/mastertt/ttindex.cfm"

chromedriver = "/Users/jasonlee/CS4471/scraper/mac/chromedriver"
# chromedriver = "./chromedriver"

driver = webdriver.Chrome(chromedriver)
driver.get(url)

# courseCodes = ["ACTURSCI", "AMERICAN", "ANATCELL", "ANTHRO", "APPLMATH", "ARABIC", "ARTHUM", "ASTRONOM", "BIBLSTUD", "BIOCHEM", "BIOLOGY", "BIOSTATS", "MTP-RADO", "MTP-TVSN", "MTP-FLDP", "BUSINESS", "CALCULUS", "CGS", "CBE", "CHEMBIO", "CHEM", "CSI", "CHINESE", "CHURCH", "CHURLAW", "CHURMUSI", "CEE", "CLASSICS", "CMBPROG", "COMMSCI", "COMPLIT", "COMPSCI", "DANCE", "DIGICOMM", "MTP-DIGL", "DIGIHUM", "DOL", "DISABST", "EARTHSCI", "ECONOMIC", "EELC", "ECE", "ENGSCI", "ENGLISH", "ENVIRSCI", "EPID", "EPIDEMIO", "FAMLYSTU", "FLDEDUC", "MTP-FILM", "FILM", "FINMOD", "FRSTNATN", "FOODNUTR", "FRENCH", "GEOGRAPH", "GEOLOGY", "GEOPHYS", "GERMAN", "GREEK", "GPE", "HEALTSCI", "HEBREW", "HINDI", "HISTTHEO", "HISTORY", "HISTSCI", "HOMILET", "HUMANECO", "INTEGSCI", "ICC", "INTERDIS", "INTREL", "ITALIAN", "JAPANESE", "JEWISH", "MTP-BRJR", "KINESIOL", "LATIN", "LAW", "LINGUIST", "LITURST", "LITURGIC", "MOS", "MTP-MKTG", "MATH", "MME", "MSE", "MIT", "MEDBIO", "MEDHINFO", "MEDSCIEN", "MEDIEVAL", "MICROIMM", "MORALTHE", "MTP-MMED", "MUSIC", "NEURO", "NURSING", "PASTTHEO", "PATHOL", "PERSIAN", "PHARM", "PHILST", "PHILOSOP", "PHYSICS", "PHYSIOL", "PHYSPHRM", "POLISCI", "PORTUGSE", "PSYCHOL", "REHABSCI", "RELEDUC", "RELSTUD", "SACRTHEO", "SCHOLARS", "SCIENCE", "SOCLJUST", "SOCWORK", "SOCIOLOG", "SE", "SPANISH", "SPEECH", "SPIRTHEO", "STATS", "SUPPAST", "SYSTHEO", "THANAT", "THEATRE", "THEOETH", "THEOLST", "THESIS", "TJ", "VAHISTRY", "VASTUDIO", "WTC", "WOMENST", "WORLDLIT", "WRITING"] 
courseCodes = ["ACTURSCI", "AMERICAN"]
f = csv.writer(open("dict.csv", "w"))

sangeet = []

for j, code in enumerate(courseCodes):

    # data.append(code)
    # Take a break after every scrape otherwise we run into a captcha.
    time.sleep(10)
    print(code)
    select = Select(driver.find_element_by_id('inputSubject'))
    select.select_by_value(code)

    driver.find_element_by_css_selector('.btn.btn-info.span2').click()

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    table = soup.find(class_='span12')
    title = soup.find_all('h4')
    soupstring = str(table)
    souparray = soupstring.split('<h4>')
    courses = {}
    counter = 0
    parsedResult = []

    for element in souparray:
        splitting = element.split('<tr>')
        # print(splitting)
        val = []

        for values in splitting:
            if('<td width="10%">' in values):
                result = re.sub("<*?>","",values)
                result = re.sub("<??td","", result)
                result = re.sub('width="10%"',"", result)
                result = re.sub("<*/*\\n", "\n", result)
                result = re.sub("</tr </tbody</table", "\n", result)
                result = re.split("\n", result)
                result = [el.replace('\xa0',' ') for el in result]
                result = [ele.replace('</tr',' ') for ele in result]
                result = [elem.replace('</tbody</table',' ') for elem in result]
                for i in result:
                    val.append(i)
                    counter += 1
                    if counter == 12:
                        counter = 0
                        break
                print('\n')
            else:
                continue

        for eachTag in splitting:
            firstLine = eachTag.split('</h4>')
            key = firstLine[0]
            courses.setdefault(key, []).append(val)
            # print(courses)

                # writer = csv.writer(csv_file)
            val = []
            break
    sangeet.append(courses)
    with open('data.json', 'w') as fp:
        json.dump(sangeet, fp)


